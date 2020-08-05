import React from "react";
import "./app.sass";
import NodeFrame from "../node-frame";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Artspresso</h1>
        </div>
        <div className="app-main">	  
          <NodeFrame />
        </div>
      </header>
    </div>
  );
}


export default App;
