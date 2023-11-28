import { useTheme } from "../context/ThemeContext";

// Preparing classes dynamically for the elements based on the theme
// This utility can be used to generate the dynamic classes by passing an element identity
// Greatly useful for separating all the classes from the components and to make components more cleaner
// Note: Currently not been in use in the project - Keeping for reference
// Currently using tailwind's default darkMode setup in the project
export const getThemeClasses = (type) => {
   const { darkMode } = useTheme();

   const btnBaseClasses = 'px-3 py-2 border-2 rounded-lg';

   switch (type) {
      case 'button':
         return darkMode
        ? `${btnBaseClasses} bg-white text-black border-black`
        : `${btnBaseClasses} bg-black text-white border-white`;

      case 'text':
         return darkMode ? 'text-black' : 'text-white';


      default:
         return ''; // Return an empty string for unknown types
   }
};
