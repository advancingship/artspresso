import React from "react";
import "./app.sass";
import {useState} from "react";
import ControlFrameView from "../control-frame";
import WorkspaceView from "../workspace/";
import {App} from "./";

function AppView() {

    const [mode, set_mode] = useState(App.PIN_MODE);
    const [fake, set_fake] = useState("fake")
    let result_items, result_error;
    const x = async () => {
        await fetch("/frames/", {
            mode: 'no-cors'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    result_items = JSON.parse(result)[0]
                    set_fake(fake => JSON.stringify(result_items))
                },
                (error) => {
                    result_error = error;
                });
    }
    x();
    return (
    <div className="app">
      <header className="app-header">
          <h1>Artspresso {fake}</h1>
      </header>
      <div className="app-main">
          <WorkspaceView mode={mode} />
          <ControlFrameView mode={mode} set_mode={set_mode} />
      </div>
    </div>
  );
}


export default AppView;