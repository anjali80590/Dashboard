import React, { useState } from "react";
import "./../styles/Widget.css";
import "./../styles/Dashboard.css"

const AddWidgetSidebar = ({
  section,
  widgets,
  addWidget,
  toggleWidgetVisibility,
  cancel,
}) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetContent, setWidgetContent] = useState("");
  const [localVisibility, setLocalVisibility] = useState(
    widgets.map((widget) => ({ name: widget.name, visible: widget.visible }))
  );

  const handleAdd = () => {
    if (widgetName.trim() && widgetContent.trim()) {
      addWidget(section, widgetName.trim(), widgetContent.trim());
      setWidgetName("");
      setWidgetContent("");
    }
  };

  const handleToggleVisibility = (widgetName) => {
    setLocalVisibility(
      localVisibility.map((widget) =>
        widget.name === widgetName
          ? { ...widget, visible: !widget.visible }
          : widget
      )
    );
  };

  const handleConfirm = () => {
    localVisibility.forEach((widget) =>
      toggleWidgetVisibility(section, widget.name, widget.visible)
    );
    cancel(); // Close the sidebar after confirming
  };

  return (
    <div className="add-widget-sidebar">
      <div className="sidebar-header">
        <h3>Add Widget to {section}</h3>
        <div className="close" onClick={cancel}>
          X
        </div>
      </div>
      <input
        type="text"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
        placeholder="Widget name"
        className="widget-input"
      />
      <textarea
        value={widgetContent}
        onChange={(e) => setWidgetContent(e.target.value)}
        placeholder="Widget content"
        className="widget-input"
      />
      <button onClick={handleAdd} className="confirm-btn">
        Add Widget
      </button>
      <h4>Existing Widgets</h4>
      <div className="existing-widgets">
        {widgets.map((widget, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={
                localVisibility.find((w) => w.name === widget.name)?.visible
              }
              onChange={() => handleToggleVisibility(widget.name)}
            />
            <span className="existing-text">{widget.name}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="section-sidebar-buttons"
      >
        <button
          onClick={handleConfirm}
          className="confirm-btn"
          style={{ marginRight: "10px" }}
        >
          Confirm
        </button>
        <button onClick={cancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddWidgetSidebar;
