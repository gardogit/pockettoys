// AuthTabContext.js
import React, { createContext, useState } from 'react';

export const AuthTabContext = createContext();

export const AuthTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <AuthTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </AuthTabContext.Provider>
  );
};
