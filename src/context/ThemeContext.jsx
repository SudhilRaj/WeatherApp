import { createContext, useContext, useReducer, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

   /**
    * Approach 1 - Using reducer setup (Not in use, keeping for reference)
    * 
    */
   // const initialState = { darkMode: false };

   // const themeReducer = (state, action) => {
   //    switch (action.type) {
   //       case "LIGHTMODE":
   //          return { darkMode: false };
   //       case "DARKMODE":
   //          return { darkMode: true };
   //       default:
   //       return state;
   //    }
   // };

   // const [state, dispatch] = useReducer(themeReducer, initialState);


   /**
    * Approach 2 - Using a simple state and a toggle function
    * The setup with the reducer actually not required in this case
    * 
    */
   const [darkMode, setDarkMode] = useState(false);
   const toggleDarkMode = () => {
     setDarkMode((prevMode) => !prevMode);
   };

   return(
      // <ThemeContext.Provider value={{theme:state, dispatch:dispatch}}> // For Approach 1
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
         {children}
      </ThemeContext.Provider>
   )
}

/**
 * Global method to subscribe the theme values from anywhere in the app
 * Instead adding const{ darkMode, toggleDarkMode } = useContext(ThemeContext); in every component,
 * We can directly get the values using this method: const { darkMode, toggleDarkMode } = useTheme();
 * 
 */
export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }

   return context;
};