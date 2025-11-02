import React, { createContext, useContext, useState } from 'react';

const CallContext = createContext();

export const useCallContext = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCallContext must be used within a CallProvider');
  }
  return context;
};

export const CallProvider = ({ children }) => {
  const [activeCallId, setActiveCallId] = useState(null);

  const startCall = (callId) => {
    setActiveCallId(callId);
  };

  const endCall = () => {
    setActiveCallId(null);
  };

  const isCallActive = (callId) => {
    return activeCallId === callId;
  };

  const hasActiveCall = () => {
    return activeCallId !== null;
  };

  return (
    <CallContext.Provider value={{ activeCallId, startCall, endCall, isCallActive, hasActiveCall }}>
      {children}
    </CallContext.Provider>
  );
};
