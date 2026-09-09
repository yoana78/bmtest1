import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 'classic' (Current Modern Corporate Blue)
  // 'dark-executive' (Premium Dark Executive & Gold)
  // 'warm-studio' (Warm Eco Beige & Soft Blue)
  const [theme, setTheme] = useState('classic');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-root theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
