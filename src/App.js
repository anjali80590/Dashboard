// import React from 'react'
// import Dashboard from './components/Dashboard'

// function App() {
//   return (
//     <div>
//       <Dashboard/>
//     </div>
//   )
// }

// export default App
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import AddWidgetSidebar from "./components/AddWidgetSidebar";

const App = () => {
  const [widgets, setWidgets] = useState({
    CSPM: {},
    CWPP: {},
    RegistryScan: {},
  });

  const [activeSection, setActiveSection] = useState(null);

  const addWidget = (section, widgetName, widgetContent) => {
    setWidgets({
      ...widgets,
      [section]: {
        ...widgets[section],
        [widgetName]: widgetContent,
      },
    });
    setActiveSection(null); // Close the sidebar after adding
  };

  const toggleSidebar = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="app-container">
      <Dashboard widgets={widgets} toggleSidebar={toggleSidebar} />
      {activeSection && (
        <AddWidgetSidebar
          section={activeSection}
          addWidget={addWidget}
          cancel={() => setActiveSection(null)}
        />
      )}
    </div>
  );
};

export default App;
