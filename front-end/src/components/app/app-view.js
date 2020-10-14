import React from "react";
import "./app.sass";
import {useState} from "react";
import ControlFrameView from "../control-frame";
import WorkspaceView from "../workspace/";
import {App} from "./";

function AppView() {

    const [mode, set_mode] = useState(App.PIN_MODE);

    return (
    <div className="app">
      <header className="app-header">
          <h1>Artspresso</h1>
      </header>
      <div className="app-main">
          <WorkspaceView mode={mode} />
          <ControlFrameView mode={mode} set_mode={set_mode} />
      </div>
    </div>
  );
}


export default AppView;