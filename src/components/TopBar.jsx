import React from "react";

// TopBar component for the top bar of the application
const TopBar = ({ onSave }) => {
  return (
    <div className="flex items-center justify-between w-full h-12 bg-slate-300 text-white px-4 z-50 absolute">
      <h1 className="roboto-bold text-lg text-gray-800">Flow Editor</h1>
      <button
        onClick={onSave} // calls the onSave function when clicked
        className="px-3 py-1 bg-gray-50 rounded hover:border hover:border-blue-500 text-blue-500"
      >
        Save Changes
      </button>
    </div>
  );
};

export default TopBar;
