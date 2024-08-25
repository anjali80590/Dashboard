
import React, { useState } from "react";
import "./../styles/Dashboard.css"

const SectionSidebar = ({ onAddSection, onCancel }) => {
  const [sectionName, setSectionName] = useState("");

  const handleAdd = () => {
    if (sectionName.trim()) {
      onAddSection(sectionName.trim());
      setSectionName("");
    }
  };

  return (
    <div className="section-sidebar">
      <div className="section-sidebar-header">
        <h4>Add New Section</h4>
        <span className="close-icon" onClick={onCancel}>
          X
        </span>
      </div>
      <input
        type="text"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        placeholder="Enter section name (e.g., CSPM, CWPP)"
        className="section-input"
      />
      <div className="section-sidebar-buttons">
        <button onClick={handleAdd} className="confirm-btn">
          Add Section
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SectionSidebar;
