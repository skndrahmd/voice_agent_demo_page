import React from 'react';
import VoiceWidget from './components/voice_widget/VoiceWidget';
import './App.css';

// Import environment variables
const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const SALES_ASSISTANT_ID = import.meta.env.VITE_SALES_ASSISTANT_ID;
const SUPPORT_ASSISTANT_ID = import.meta.env.VITE_SUPPORT_ASSISTANT_ID;
const DEMO_ASSISTANT_ID = import.meta.env.VITE_DEMO_ASSISTANT_ID;

const App = () => {
  return (
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
          apiKey={VAPI_PUBLIC_KEY}
          assistantId={SALES_ASSISTANT_ID}
          title="Customer Support Agent"
          description="Talk to our Customer Support Agent"
          startButtonText="Start Conversation"
        />
      </div>


        <div className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Like the demo? Book a free appointment with us now to get one for your business</p>
          <a href="https://calendly.com/scrift/30min" className="book-appointment-button" target="_blank" rel="noreferrer">Book Appointment</a>
        </div>

    </div>
  );
};

export default App;
