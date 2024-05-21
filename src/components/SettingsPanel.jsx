import React, { useState, useEffect } from "react";

const SettingsPanel = ({ selectedNode, onTextChange, onBack, onDelete }) => {
  const [text, setText] = useState(""); // State to manage the text

  // Using useEffect to update the text input when a new node is selected
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.label);
    }
  }, [selectedNode]);

  // Handler for text input changes
  const handleTextChange = (event) => {
    setText(event.target.value);
    onTextChange(selectedNode.id, event.target.value);
  };

  // If no node is selected, we are not rendering the settings panel
  if (!selectedNode) {
    return null;
  }

  return (
    <aside className="fixed mt-12 top-0 right-0 w-1/5 h-full bg-gray-100 border-gray-200 border-l-2 p-4 z-10">
      <div className="mb-2">
        <label className="block mb-1">Text:</label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <button
        onClick={onBack}
        className="w-full p-2 bg-blue-500 text-white rounded mb-2"
      >
        Save Text
      </button>
      <button
        onClick={onBack}
        className="w-full p-2 bg-slate-500 text-white mb-2 rounded"
      >
        Back to Nodes Panel
      </button>
      <button
        onClick={() => onDelete([selectedNode])}
        className="w-full p-2 bg-red-400 text-white rounded"
      >
        Delete Node
      </button>
    </aside>
  );
};

export default SettingsPanel;
