import React, { createContext, useContext, useState, useEffect } from "react";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const AlertContext = createContext();

export function useAlerts() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (content, type = "info", duration = 4000) => {
    const id = uuidv4();
    // aggiungi notifica inizialmente fuori schermo
    const newAlert = { id, content, type, entering: false, exiting: false };
    setAlerts((prev) => [...prev, newAlert]);

    // Triggera slide-in nel prossimo tick
    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, entering: true } : a))
      );
    }, 10);

    if (duration > 0) {
      setTimeout(() => removeAlert(id), duration);
    }
  };

  const removeAlert = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, exiting: true } : a))
    );
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 300); // durata animazione
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 items-end z-50">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start space-x-3 p-4 w-80 max-w-sm bg-white/5 backdrop-blur-md border border-cyan-400/20 rounded-xl shadow-[0_0_15px_rgba(50,224,220,0.2)]
              transform transition-all duration-300 ease-out
              ${
                alert.entering && !alert.exiting
                  ? "translate-x-0 opacity-100"
                  : !alert.entering && !alert.exiting
                  ? "translate-x-full opacity-0"
                  : alert.exiting
                  ? "translate-x-full opacity-0"
                  : ""
              }
            `}
          >
            <div className="flex-1">
              {typeof alert.content === "string" ? (
                <p className="text-sm">{alert.content}</p>
              ) : (
                alert.content
              )}
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="ml-2 text-cyan-400 hover:text-cyan-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}