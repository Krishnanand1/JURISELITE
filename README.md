# JURISELITE

JurisElite is a modern, responsive web application designed for listing premium legal advocates across India. It features real-time search and filtering, fee estimation in INR (₹), interactive booking modal workflows, a VIP concierge desk, and an integrated n8n AI Chatbot powered by n8n webhooks.

## Key Features

Advocate Directory: Filter lawyers by practice area (Corporate, IP, Criminal Defense, Property Law, Civil, Family Law) and sort by rating, win rate, or fee structure.

Indian Financial Formatting: All consultation, retainer, and hourly fees are dynamic and standard-formatted in INR (₹).

Interactive Booking Modal: Schedule 1-on-1 legal consultations directly through an intuitive modal overlay.

VIP Concierge Portal: Priority intake desk for high-court advocacy and bar enrollment queries.

Dark / Light Mode: Seamless theme toggling with automated local storage persistence.

n8n AI Chatbot Integration: Floating AI Assistant connected to an n8n webhook workflow for real-time customer support.

## Tech Stack

Frontend: HTML5, JavaScript (ES6+)

Styling: Tailwind CSS CDN with custom dark mode & gold gradient utilities

Icons: FontAwesome 6

Workflow Automation / AI: n8n Workflow Engine via Webhook API

## Getting Started

Prerequisites

No complex build setup is required! The project uses standard HTML, Tailwind CSS CDN, and native JavaScript.

Running Locally

Clone the repository:

git clone https://github.com/your-username/juriselite-network.git
cd juriselite-network


Open the project:
Open index.html in your favorite web browser or run it with a local development server like VS Code Live Server.

## How to Insert n8n as a Chatbot

You can integrate n8n as an AI chatbot into your website using two primary methods:

Option 1: Official n8n Chat Embedded Widget (Recommended)

n8n provides an official, lightweight JavaScript library (@n8n/chat) that automatically injects a floating chat window into your HTML pages.

1. Include CSS and Script in HTML

Add the following snippet inside your <head> tag or before the closing </body> tag:

<!-- n8n Chat Stylesheet -->
<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />

<!-- n8n Chat Initializer Script -->
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

  createChat({
    webhookUrl: 'https://your-n8n-instance.cloud/webhook/YOUR-CHAT-WEBHOOK-ID/chat',
    mode: 'window', // Options: 'window' (floating popup) or 'fullscreen'
    initialMessages: [
      'Namaste! 👋 Welcome to JurisElite.',
      'How can I help you find legal counsel today?'
    ],
    i18n: {
      en: {
        title: 'JurisBot Legal AI',
        subtitle: 'Powered by n8n Workflow',
        footer: '',
        getStarted: 'Start New Chat',
        inputPlaceholder: 'Type your legal query...',
      },
    },
  });
</script>


Option 2: Custom JavaScript Webhook Integration (Used in JurisElite UI)

If you want complete control over the chat interface design, animations, and custom UI components (such as Tailwind CSS modal bubbles), you can communicate with n8n directly using fetch() POST requests.

JavaScript Implementation Example

// 1. Define your n8n Chat Trigger Webhook URL
const N8N_WEBHOOK_URL = "https://your-n8n-instance.cloud/webhook/YOUR-CHAT-WEBHOOK-ID/chat";

// 2. Generate or retrieve a persistent session ID
let sessionId = localStorage.getItem('n8nSessionId') || 'session_' + Math.random().toString(36).substring(2, 9);
localStorage.setItem('n8nSessionId', sessionId);

// 3. Send User Input to n8n Webhook
async function sendChatMessage(userText) {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: userText,
        message: userText
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Parse output from n8n response array/object
      let botResponse = '';
      if (Array.isArray(data) && data[0]) {
        botResponse = data[0].output || data[0].text || data[0].message;
      } else {
        botResponse = data.output || data.text || data.message;
      }

      console.log("n8n AI Response:", botResponse);
      return botResponse;
    } else {
      throw new Error("HTTP error! Status: " + response.status);
    }
  } catch (error) {
    console.error("n8n Connection Error:", error);
    return "Our legal assistant is currently offline. Please leave your details with our VIP desk.";
  }
}


## Setting Up the n8n Workflow

To make sure your n8n workflow accepts requests from your website:

Add n8n Chat Trigger Node:

In your n8n canvas, add an n8n Chat Trigger or Webhook node.

Set the HTTP method to POST.

Configure CORS:

In the Chat Trigger node settings under Options, add Allowed Origins.

Set it to * for development or enter your production domain (e.g., https://yourdomain.com).

Connect AI Models or Logic:

Chain the trigger to an AI Agent node, OpenAI / Anthropic node, or custom code logic.

Publish Workflow:

Switch the workflow toggle from Draft/Testing to Active.

Copy the Production Webhook URL and update your frontend application code.
