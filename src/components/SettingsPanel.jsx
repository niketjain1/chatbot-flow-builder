// src/SettingsPanel.js
import React from "react";

const SettingsPanel = ({ selectedNode, onTextChange, onSave }) => {
  if (!selectedNode) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 w-1/5 h-full bg-gray-100 border-gray-200 border-l-2 p-4 z-10">
      <div className="mb-2">
        <label className="block mb-1">Text:</label>
        <input
          type="text"
          onChange={(event) =>
            onTextChange(selectedNode.id, event.target.value)
          }
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <button
        onClick={onSave}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save Changes
      </button>
    </aside>
  );
};

export default SettingsPanel;
