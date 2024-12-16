import React, {createContext, useState, useContext} from 'react';

const PreferencesContext = createContext(null);

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({children}) => {
  const [preferences, setPreferences] = useState({
    agePreference: {
      minAge: '',
      maxAge: '',
    },
    genderPreference: '',
    budgetPreference: {
      low: '',
      high: '',
    },
  });

  return (
    <PreferencesContext.Provider value={{preferences, setPreferences}}>
      {children}
    </PreferencesContext.Provider>
  );
};
