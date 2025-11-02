import React from 'react';
import VoiceWidget from './components/voice_widget/VoiceWidget';
import { CallProvider } from './contexts/CallContext';
import './App.css';

// Import environment variables
const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const SALES_ASSISTANT_ID = import.meta.env.VITE_SALES_ASSISTANT_ID;
const SUPPORT_ASSISTANT_ID = import.meta.env.VITE_SUPPORT_ASSISTANT_ID || SALES_ASSISTANT_ID;
const DEMO_ASSISTANT_ID = import.meta.env.VITE_DEMO_ASSISTANT_ID || SALES_ASSISTANT_ID;

const App = () => {
  return (
    <CallProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="app-logo-container">
            <img src="/logo.png" alt="Scrift Logo" className="app-logo" />
          </div>
          <h1>Voice Agent Demos</h1>
          <p>Explore different AI voice assistants by Scrift</p>
        </header>

        <div className="widgets-grid">
          <VoiceWidget
            widgetId="customer-support"
            apiKey={VAPI_PUBLIC_KEY}
            assistantId={SALES_ASSISTANT_ID}
            title="Customer Support Agent"
            description="Talk to our Customer Support Agent"
            startButtonText="Start Conversation"
          />

          <VoiceWidget
            widgetId="sales-agent"
            apiKey={VAPI_PUBLIC_KEY}
            assistantId={SUPPORT_ASSISTANT_ID}
            title="Sales Agent"
            description="Speak with our sales representative"
            startButtonText="Talk to Sales"
          />

          <VoiceWidget
            widgetId="product-demo"
            apiKey={VAPI_PUBLIC_KEY}
            assistantId={DEMO_ASSISTANT_ID}
            title="Product Demo"
            description="Get a product demonstration"
            startButtonText="Start Demo"
          />
        </div>


        <div className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Like the demo? Book a free appointment with us now to get one for your business</p>
          <a href="https://calendly.com/scrift/30min" className="book-appointment-button" target="_blank" rel="noreferrer">Book Appointment</a>
        </div>

      </div>
    </CallProvider>
  );
};

export default App;
