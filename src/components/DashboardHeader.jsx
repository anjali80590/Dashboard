import React, { useState } from "react";
import "./../styles/Dashboard.css";

const DashboardHeader = ({ onAddSectionClick, setFilter, filter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dashboard-header">
      <h4 className="dashboard-title">CNAPP Dashboard</h4>
      <div className="dashboard-controls">
        <button className="add-widget-btn" onClick={onAddSectionClick}>
          Add Widget <span className="plus-header">+</span>
        </button>
        <button className="settings-btn">⚙️</button>
        <div className="dropdown">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            {filter} ⏷
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={() => handleFilterChange("Last 2 days")}>
                Last 2 days
              </button>
              <button onClick={() => handleFilterChange("Last week")}>
                Last week
              </button>
              <button onClick={() => handleFilterChange("Last month")}>
                Last month
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
