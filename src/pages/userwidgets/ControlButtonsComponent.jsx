// src/pages/userwidgets/ControlButtonsComponent.jsx
import React from "react";

const ControlButtonsComponent = ({
  isEditing,
  toggleEditing,
  handleSaveChanges,
  handleViewCard,
}) => (
  <div className="flex justify-end mb-4">
    <button
      onClick={toggleEditing}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
    >
      {isEditing ? "Cancel" : "Edit"}
    </button>
    {isEditing && (
      <button
        onClick={handleSaveChanges}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Save
      </button>
    )}
    <button
      onClick={handleViewCard}
      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    >
      View Card
    </button>
  </div>
);

export default ControlButtonsComponent;
