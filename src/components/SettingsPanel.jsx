import React, { useState, useEffect } from "react";

const SettingsPanel = ({ selectedNode, onTextChange, onBack }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.label);
    }
  }, [selectedNode]);

  const handleTextChange = (event) => {
    setText(event.target.value);
    onTextChange(selectedNode.id, event.target.value);
  };

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
        className="w-full p-2 bg-slate-500 text-white rounded"
      >
        Back to Nodes Panel
      </button>
    </aside>
  );
};

export default SettingsPanel;
