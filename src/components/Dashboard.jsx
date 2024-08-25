

import React, { useState } from "react";
import "./../styles/Dashboard.css";
import DonutChart from "./DonutChart";
import DashboardHeader from "./DashboardHeader";
import AddWidgetSidebar from "./AddWidgetSidebar";
import SectionSidebar from "./SectionSidebar";

const Dashboard = () => {
  const [sections, setSections] = useState([
    {
      name: "CSPM",
      widgets: [
        {
          name: "Cloud Account",
          component: <DonutChart type="cloud-accounts" />,
          visible: true,
          createdAt: new Date(),
        },
        {
          name: "Cloud Account Risk Assessment",
          component: <DonutChart type="risk-assessment" />,
          visible: true,
          createdAt: new Date(),
        },
      ],
    },
    {
      name: "CWPP",
      widgets: [
        {
          name: "Top 5 Namespace Specific Alerts",
          component: (
            <div className="no-data-text">No Graph data available!</div>
          ),
          visible: true,
          createdAt: new Date(),
        },
        {
          name: "Workload Alerts",
          component: (
            <div className="no-data-text">No Graph data available!</div>
          ),
          visible: true,
          createdAt: new Date(),
        },
      ],
    },
    {
      name: "RegistryScan",
      widgets: [
        {
          name: "Image Risk Assessment",
          component: (
            <div>
              <div className="risk-bar">
                <div className="risk critical"></div>
                <div className="risk high"></div>
                <div className="risk medium"></div>
                <div className="risk low"></div>
              </div>
              <div className="legend-Registry">
                <div className="legend-item">
                  <span className="legend-color critical"></span>
                  <span>Critical (9)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color high"></span>
                  <span>High (160)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color medium"></span>
                  <span>Medium (1301)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color low"></span>
                  <span>Low (0)</span>
                </div>
              </div>
            </div>
          ),
          visible: true,
          createdAt: new Date(),
        },
        {
          name: "Image Security Issues",
          component: (
            <div>
              <div className="risk-bar">
                <div className="risk critical"></div>
                <div className="risk high"></div>
                <div className="risk medium"></div>
                <div className="risk low"></div>
              </div>
              <div className="legend-Registry">
                <div className="legend-item">
                  <span className="legend-color critical"></span>
                  <span>Critical (2)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color high"></span>
                  <span>High (0)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color medium"></span>
                  <span>Medium (0)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color low"></span>
                  <span>Low (0)</span>
                </div>
              </div>
            </div>
          ),
          visible: true,
          createdAt: new Date(),
        },
      ],
    },
  ]);

  const [activeSection, setActiveSection] = useState(null);
  const [isSectionSidebarOpen, setIsSectionSidebarOpen] = useState(false);
const [filter, setFilter] = useState("Last 2 days");
  const handleAddSectionClick = () => {
    setIsSectionSidebarOpen(true);
  };

  const handleAddSection = (sectionName) => {
    if (!sections.some((section) => section.name === sectionName)) {
      const newSection = { name: sectionName, widgets: [] };
      setSections([...sections, newSection]); // Append the new section to the end of the array
      setIsSectionSidebarOpen(false);
    } else {
      alert("Section already exists!");
    }
  };

  const handleWidgetAdd = (sectionName, widgetName, widgetContent) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.name === sectionName
          ? {
              ...section,
              widgets: [
                ...section.widgets,
                {
                  name: widgetName,
                  component: (
                    <div className="dynamic-content">{widgetContent}</div>
                  ),
                  visible: true,
                  createdAt: new Date(),
                },
              ],
            }
          : section
      )
    );
    setActiveSection(null);
  };

  const toggleWidgetVisibility = (sectionName, widgetName, isVisible) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.name === sectionName
          ? {
              ...section,
              widgets: section.widgets.map((widget) =>
                widget.name === widgetName
                  ? { ...widget, visible: isVisible }
                  : widget
              ),
            }
          : section
      )
    );
  };

  const handleSidebarCancel = () => {
    setActiveSection(null);
    setIsSectionSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      <DashboardHeader
        onAddSectionClick={handleAddSectionClick}
        setFilter={setFilter}
        filter={filter}
      />
      {sections.map((section, index) => (
        <div key={index} className="section">
          <div className="section-header">{section.name} Dashboard</div>
          <div className="widget-container">
            {section.widgets
              .filter((widget) => widget.visible)
              .map((widget, widgetIndex) => (
                <div key={widgetIndex} className="widget">
                  <p className="text">{widget.name}</p>
                  {widget.component}
                </div>
              ))}
            <div className="widget add-widget">
              <button
                className="add-widget-btn"
                onClick={() => setActiveSection(section.name)}
              >
                <span className="plus">+</span> Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}
      {activeSection && (
        <AddWidgetSidebar
          section={activeSection}
          widgets={
            sections.find((section) => section.name === activeSection).widgets
          }
          addWidget={handleWidgetAdd}
          toggleWidgetVisibility={toggleWidgetVisibility}
          cancel={handleSidebarCancel}
        />
      )}
      {isSectionSidebarOpen && (
        <SectionSidebar
          onAddSection={handleAddSection}
          onCancel={handleSidebarCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;










