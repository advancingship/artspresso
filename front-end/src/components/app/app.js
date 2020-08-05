import React from "react";
import "./app.sass";
import NodeFrame from "../node-frame";

function App() {
  return (
    <div className="app">
      <header className="app-header">
          <h1>Artspresso</h1>
      </header>
      <div className="app-main">
        <NodeFrame />
      </div>
    </div>
  );
}


export default App;
