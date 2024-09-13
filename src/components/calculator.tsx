
"use client"


import { FaEquals, FaMoon, FaSun, FaTrashAlt } from "react-icons/fa"; // Import icons from react-icons
import { RiCloseCircleFill } from "react-icons/ri"; // Import close icon from react-icons (cartoon style)

import { useState, useEffect, useRef } from "react"; // Import React hooks for state, effect, and ref management

// Define a type for theme, which can either be "dark" or "light"
type Theme = "dark" | "light";

// Calculator component
export const Calculator: React.FC = () => {
  // State to store the input and result for the calculator
  const [input, setInput] = useState<string>(""); // Input (user typing or pressing buttons)
  const [result, setResult] = useState<string>(""); // Display result of calculation
  const [theme, setTheme] = useState<Theme>("dark"); // Current theme state (dark or light)

  // Reference for the audio element (background music)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to handle button clicks for numbers and operators
  const handleClick = (value: string) => {
    const operatorMap: { [key: string]: string } = {
      "➕": "+",
      "➖": "-",
      "✖": "*",
      "➗": "/",
    }; // Map special operator buttons to actual operators
    setInput((prev) => prev + (operatorMap[value] || value)); // Add the clicked value to the input
  };

  // Clear the input and result when the clear button is pressed
  const handleClear = () => {
    setInput(""); // Reset input
    setResult(""); // Reset result
  };

  // Handle deleting the last character from the input
  const handleDelete = () => setInput(input.slice(0, -1)); // Remove the last character from input

  // Evaluate the expression in the input when the equals button is pressed
  const handleCalculate = () => {
    try {
      setResult(eval(input)); // Use eval to compute the input expression (simple but be cautious with eval in production)
    } catch {
      setResult("Error"); // Show error if the calculation fails
    }
  };

  // Change the current theme (dark or light) when theme buttons are clicked
  const changeTheme = (newTheme: Theme) => setTheme(newTheme);

  // Define different styles based on the theme (dark/light)
  const themeStyles: Record<
    Theme,
    {
      calcBg: string;
      resultBg: string;
      result: string;
      btn: string;
      clear: string;
      del: string;
      equal: string;
      digit: string;
      container: string;
    }
  > = {
    dark: {
      calcBg: "bg-gradient-to-br from-yellow-500 to-yellow-600", // Background for input field in dark mode
      resultBg: "bg-gradient-to-br from-gray-700 to-gray-900", // Background for result display
      result: "text-white", // Result text color
      btn: "bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600", // Button styles in dark mode
      clear:
        "bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400", // Clear button style
      del: "bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400", // Delete button style
      equal:
        "bg-gradient-to-br from-green-700 to-green-600 hover:from-green-600 hover:to-green-500", // Equals button style
      digit: "text-white font-bold text-2xl", // Style for button text (numbers, operators)
      container: "bg-gradient-to-br from-yellow-400 to-yellow-300", // Container background in dark mode
    },
    light: {
      calcBg: "bg-gradient-to-br from-yellow-400 to-yellow-300", // Background for input field in light mode
      resultBg: "bg-gradient-to-br from-gray-100 to-gray-200", // Background for result display in light mode
      result: "text-black", // Result text color in light mode
      btn: "bg-gradient-to-br from-red-400 to-red-300 hover:from-red-300 hover:to-red-200", // Button styles in light mode
      clear:
        "bg-gradient-to-br from-red-500 to-red-400 hover:from-red-400 hover:to-red-300", // Clear button style
      del: "bg-gradient-to-br from-red-500 to-red-400 hover:from-red-400 to-red-300", // Delete button style
      equal:
        "bg-gradient-to-br from-green-400 to-green-300 hover:from-green-300 to-green-200", // Equals button style
      digit: "text-black font-bold text-2xl", // Style for button text (numbers, operators)
      container: "bg-gradient-to-br from-yellow-300 to-yellow-200", // Container background in light mode
    },
  };

  // Get the current theme styles (either dark or light)
  const currentTheme = themeStyles[theme];

  // Play the background music once the component is mounted
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play(); // Play audio when the component mounts
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/image.jpg')", // Set background image
        backgroundSize: "cover", // Cover the full area with the image
        backgroundPosition: "center", // Center the image
        minHeight: "100vh", // Ensure full viewport height
      }}
      className={`flex items-center justify-center`} // Center the calculator on the page
    >
      <div className={`shadow-lg rounded-lg p-6 w-80 ${currentTheme.container}`}>
        {/* Input and result display */}
        <div className="mb-4 text-right">
          <input
            type="text"
            value={input}
            placeholder="0"
            className={`w-full h-14 ${currentTheme.calcBg} text-right p-4 rounded mb-2 disabled ${currentTheme.digit}`}
            disabled // Disabled to make it read-only
          />
          <div className={`p-4 rounded ${currentTheme.resultBg} mb-4`}>
            <h1 className={`text-2xl ${currentTheme.result}`}>{result}</h1>
          </div>
        </div>

        {/* Calculator buttons */}
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "➗"].map((item) => (
            <button
              key={item}
              className={`p-4 rounded-lg ${currentTheme.btn} ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
              onClick={() => handleClick(item)} // Call handleClick with button value
            >
              {item}
            </button>
          ))}
          {/* Repeat similar button mapping for other numbers and operators */}
          {["4", "5", "6", "✖"].map((item) => (
            <button
              key={item}
              className={`p-4 rounded-lg ${currentTheme.btn} ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          {["1", "2", "3", "➖"].map((item) => (
            <button
              key={item}
              className={`p-4 rounded-lg ${currentTheme.btn} ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          {["0", ".", "%", "➕"].map((item) => (
            <button
              key={item}
              className={`p-4 rounded-lg ${currentTheme.btn} ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}

          {/* Special buttons: Clear, Delete, Equals */}
          <button
            className={`col-span-2 ${currentTheme.clear} p-4 rounded-lg ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
            onClick={handleClear} // Clear input and result
          >
            <FaTrashAlt className="text-2xl" /> {/* Trash icon for Clear */}
          </button>
          <button
            className={`${currentTheme.del} p-4 rounded-lg ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
            onClick={handleDelete} // Delete last input
            style={{ position: "relative" }}
          >
            <RiCloseCircleFill className="text-2xl animate-bounce" /> {/* Delete icon with bounce effect */}
          </button>
          <button
            className={`${currentTheme.equal} p-4 rounded-lg ${currentTheme.digit} shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300`}
            onClick={handleCalculate} // Calculate the input
          >
            <FaEquals className="text-2xl" /> {/* Equals icon */}
          </button>
        </div>

        {/* Theme toggle buttons */}
        <div className="flex mt-4 justify-center">
          {/* Dark mode button */}
          <button
            className={`p-2 rounded-full mr-2 ${currentTheme.btn} transform hover:scale-105 transition-transform duration-300`}
            onClick={() => changeTheme("dark")} // Set theme to dark
          >
            <FaMoon className="text-xl" /> {/* Moon icon */}
          </button>

          {/* Light mode button */}
          <button
            className={`p-2 rounded-full ${currentTheme.btn} transform hover:scale-105 transition-transform duration-300`}
            onClick={() => changeTheme("light")} // Set theme to light
          >
            <FaSun className="text-xl" /> {/* Sun icon */}
          </button>
        </div>
      </div>
    </div>
  );
};
