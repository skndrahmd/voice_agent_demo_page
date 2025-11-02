import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import './styles.css';

const ScriftInbound = ({ 
  apiKey, 
  assistantId,
  title = "Voice Assistant",
  description = "Click the button below to start a conversation with your AI assistant",
  startButtonText = "Start Conversation",
  config = {} 
}) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const lottieRef = useRef(null);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsConnected(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsSpeaking(false);
      setIsMuted(false);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    });

    vapiInstance.on('message', (message) => {
      if (message.type === 'transcript') {
        setTranscript(prev => [...prev, {
          role: message?.role,
          text: message?.transcript
        }]);
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  const startCall = () => {
    if (vapi) {
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  const toggleMute = () => {
    if (vapi) {
      vapi.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  // Load Lottie animation dynamically
  useEffect(() => {
    if (isConnected && lottieRef.current) {
      // You can use lottie-web or lottie-react here
      // For now, we'll use a placeholder that you can replace with actual Lottie
    }
  }, [isConnected]);

  return (
    <div className="scrift-widget-container">
      {!isConnected ? (
        <div className="scrift-landing">
          <h1 className="scrift-title">{title}</h1>
          <p className="scrift-description">{description}</p>
          <button className="scrift-start-button" onClick={startCall}>
            <span className="scrift-start-button-icon">🎤</span>
            {startButtonText}
          </button>
        </div>
      ) : (
        <div className="scrift-call-container">
          {/* Lottie Animation Container */}
          <div className="scrift-animation-wrapper">
            <div className="scrift-animation-circle" ref={lottieRef}>
              {/* Animated Voice Waves */}
              <div className="scrift-waves-container">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`scrift-wave-bar ${isSpeaking ? 'speaking' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Status Text */}
          <div className="scrift-status-section">
            <h2 className="scrift-status-title">
              {isSpeaking ? '🔊 Assistant Speaking' : '🎧 Listening'}
            </h2>
            <p className="scrift-status-description">
              {isSpeaking ? 'The assistant is responding...' : 'Speak now, I\'m listening...'}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="scrift-controls">
            <button
              className={`scrift-button scrift-mute-button ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
            >
              {isMuted ? '🔇 Unmute' : '🎤 Mute'}
            </button>
            
            <button
              className="scrift-button scrift-end-button"
              onClick={endCall}
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriftInbound;
