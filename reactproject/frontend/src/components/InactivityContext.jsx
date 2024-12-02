// InactivityContext.js
import React, { createContext, useState, useEffect } from "react";

export const InactivityContext = createContext();

export const InactivityProvider = ({ children }) => {
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsInactive(true); // Mark user as inactive after the timeout
      }, 15 * 60 * 1000); // 15 minutes of inactivity
    };

    // Attach event listeners to reset inactivity timer
    const events = ["mousemove", "keydown", "click"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Initialize timer on load
    resetTimer();

    return () => {
      // Cleanup
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, []);

  return (
    <InactivityContext.Provider value={{ isInactive }}>
      {children}
    </InactivityContext.Provider>
  );
};
