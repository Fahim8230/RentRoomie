import React, { createContext, useState, useContext } from 'react';

const PreferencesContext = createContext(null);

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(null);

    return (
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
};