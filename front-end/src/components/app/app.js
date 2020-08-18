import React from "react";
import "./app.sass";
import NodeFrame from "../node-frame";
import * as hooks from "./hooks";
import ControlFrame from "../control-frame";

function App() {

    const {mode_names, mode, set_mode} = hooks.useApp({});

    return (
    <div className="app">
      <header className="app-header">
          <h1>Artspresso</h1>
      </header>
      <div className="app-main">
          <NodeFrame date-testid="full-frame-id" mode_names={mode_names}
                     mode={mode} set_mode={set_mode}
          />
          <ControlFrame mode_names={mode_names} mode={mode} set_mode={set_mode} />
      </div>
    </div>
  );
}


export default App;
