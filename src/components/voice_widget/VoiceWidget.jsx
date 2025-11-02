import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { useCallContext } from '../../contexts/CallContext';
import './styles.css';

const VoiceWidget = ({ 
  widgetId,
  apiKey, 
  assistantId,
  title = "Voice Assistant",
  description = "Click the button below to start a conversation with your AI assistant",
  startButtonText = "Start Conversation",
  config = {} 
}) => {
  const { startCall: startGlobalCall, endCall: endGlobalCall, isCallActive, hasActiveCall } = useCallContext();
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const lottieRef = useRef(null);
  
  const isThisCallActive = isCallActive(widgetId);
  const otherCallActive = hasActiveCall() && !isThisCallActive;

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsLoading(false);
      setIsConnected(true);
      // Global call already set in startCall(), no need to set again
    });

    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsLoading(false);
      setIsSpeaking(false);
      setIsMuted(false);
      endGlobalCall();
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
      setIsLoading(true);
      startGlobalCall(widgetId); // Set global state immediately when button is clicked
      vapi.start(assistantId);
    }
  };

  const cancelCall = () => {
    if (vapi) {
      vapi.stop();
      setIsLoading(false);
      endGlobalCall();
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
    <div className={`scrift-widget-container ${otherCallActive ? 'disabled' : ''}`}>
      {!isConnected ? (
        <div className="scrift-landing">
          <h1 className="scrift-title">{title}</h1>
          <p className="scrift-description">{description}</p>
          {otherCallActive && (
            <p className="scrift-disabled-message">Another agent is currently active. Please end that call first.</p>
          )}
          
          {isLoading ? (
            <div className="scrift-loading-container">
              <button 
                className="scrift-start-button scrift-loading-button" 
                disabled
              >
                <span className="scrift-spinner"></span>
                Connecting...
              </button>
              <button 
                className="scrift-cancel-button"
                onClick={cancelCall}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              className="scrift-start-button" 
              onClick={startCall}
              disabled={otherCallActive}
            >
              <span className="scrift-start-button-icon">🎤</span>
              {startButtonText}
            </button>
          )}
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

export default VoiceWidget;
