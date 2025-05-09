/**
 * Copyright 2024 Google LLC
 * Licensed under the Apache License, Version 2.0
 */
import { memo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { type Tool, SchemaType } from "@google/generative-ai";

const systemInstructionObject = {
  parts: [{
    text: `You are a helpful shopping assistant for FastBuy.
    - Keep responses short, clear, and to the point.
    - Only respond with the exact phrases listed below.
    - Do not add any extra text or explanations.
    
    - When user says 'hi' or 'hello': "Hi how can I help you today?"
    
    - When user mentions 'electronics' or 'tech': NAVIGATE to '/electronics' and say "Here are our electronics."
    
    - When user mentions 'clothing' or 'clothes': NAVIGATE to '/clothing' and say "Here are our clothing items."
    
    - When user mentions 'pet supplies' or 'pets': NAVIGATE to '/petsupplies' and say "Here are our pet supplies."
    
    - When user mentions 'cart' or 'checkout': NAVIGATE to '/cart' and say "Here's your cart."
    
    - When user mentions 'store' or 'instore' or 'services': NAVIGATE to '/instore' and say "Welcome to the store."
    
    - When user mentions 'home' or 'main': NAVIGATE to '/' and say "Welcome to FastBuy."
    
    - When user mentions 'dell xps' or 'xps laptop': NAVIGATE to '/product/dell-xps-15-laptop' and say "Here's the Dell XPS 15 laptop."
    
    - When user mentions 'leather bag' or 'handbag': NAVIGATE to '/product/luxury-leather-handbag' and say "Here's our luxury leather handbag."
    
    - When user mentions 'cat litter' or 'litter box': NAVIGATE to '/product/premium-cat-litter-box-with-hood' and say "Here's our premium cat litter box."
    
    - When user says 'add to cart': ONLY execute the tool to click the Add to Cart button. Do not say anything or respond with any text.

    - When user says 'I'm looking for a handbag' or 'show me handbags' while in the store: CLICK_HANDBAG_BUTTON and say "I'll show you our handbag collection."

    - When the rewards popup appears in the cart: SPEAK_REWARDS_POPUP and say "Check out our rewards program for extra savings!"

    - When user says 'Yes I am a rewards member' or 'I am a rewards member': CLICK_REWARDS_YES_BUTTON and do not say anything.
    `
  }]
};

const toolObject: Tool[] = [{
  functionDeclarations: [
    {
      name: "navigate",
      description: "Navigate to a specific page",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          route: {
            type: SchemaType.STRING,
            enum: [
              "/",
              "/electronics",
              "/clothing",
              "/petsupplies",
              "/cart",
              "/instore",
              "/product/dell-xps-15-laptop",
              "/product/luxury-leather-handbag",
              "/product/premium-cat-litter-box-with-hood"
            ]
          }
        },
        required: ["route"]
      }
    },
    {
      name: "addToCart",
      description: "Click the Add to Cart button on the product page.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {},
        required: []
      }
    },
    {
      name: "clickHandbagButton",
      description: "Click the handbag button in the in-store page.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {},
        required: []
      }
    },
    {
      name: "speakRewardsPopup",
      description: "Speak the rewards popup message when the popup appears in the cart.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {},
        required: []
      }
    },
    {
      name: "clickRewardsYesButton",
      description: "Click the Yes button on the rewards member popup.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {},
        required: []
      }
    }
  ]
}];

const NavAssistantComponent = () => {
  const { client, setConfig, connected } = useLiveAPIContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Set up initial config
  useEffect(() => {
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      tools: toolObject,
      systemInstruction: systemInstructionObject,
      generationConfig: {
        responseModalities: "audio",
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Aoede"
            }
          }
        }
      }
    });
  }, [setConfig]);

  // Track when AI is speaking
  useEffect(() => {
    if (!client) return;

    const handleAudioStart = () => {
      setIsSpeaking(true);
      document.dispatchEvent(new CustomEvent('ai-speaking-start'));
    };

    const handleAudioEnd = () => {
      setIsSpeaking(false);
      document.dispatchEvent(new CustomEvent('ai-speaking-end'));
    };

    client.on("audio", handleAudioStart);
    client.on("turncomplete", handleAudioEnd);
    
    return () => {
      client.off("audio", handleAudioStart);
      client.off("turncomplete", handleAudioEnd);
    };
  }, [client]);

  // Handle tool calls
  useEffect(() => {
    if (!client) return undefined;

    const handleToolCall = (toolCall: { functionCalls: any[] }) => {
      toolCall.functionCalls.forEach((fCall: any) => {
        // Only handle add to cart on product pages
        const productRoutes = [
          '/product/dell-xps-15-laptop',
          '/product/luxury-leather-handbag',
          '/product/premium-cat-litter-box-with-hood'
        ];
        if (productRoutes.includes(location.pathname) && fCall.name === 'addToCart') {
          const addToCartButton = document.querySelector('.add-to-cart-btn') as HTMLButtonElement;
          if (addToCartButton) addToCartButton.click();
          return;
        }
        // Handle handbag button click in store
        if (location.pathname === '/instore' && fCall.name === 'clickHandbagButton') {
          const handbagButton = document.querySelector('.show-bag-btn') as HTMLButtonElement;
          if (handbagButton) handbagButton.click();
          return;
        }
        // Handle rewards popup speech in cart
        if (location.pathname === '/cart' && fCall.name === 'speakRewardsPopup') {
          if (client) {
            client.send([{ text: "Check out our rewards program for extra savings!" }]);
          }
          return;
        }
        // Handle clicking Yes on rewards member popup
        if (location.pathname === '/cart' && fCall.name === 'clickRewardsYesButton') {
          const yesButton = document.querySelector('.rewards-buttons button:first-child') as HTMLButtonElement;
          if (yesButton) yesButton.click();
          return;
        }
        // Normal navigation
        if (fCall.name === "navigate" && fCall.args?.route) {
          requestAnimationFrame(() => {
            navigate(fCall.args.route);
          });
        }
      });
    };

    client.on("toolcall", handleToolCall);
    return () => {
      client.off("toolcall", handleToolCall);
    };
  }, [client, navigate, location.pathname]);

  return null;
};

export const NavAssistant = memo(NavAssistantComponent); 