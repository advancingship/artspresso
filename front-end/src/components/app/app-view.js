import React from "react";
import "./app.sass";
import {useState} from "react";
import ControlFrameView from "../control-frame";
import WorkspaceView from "../workspace/";
import {App} from "./";

import {FrameService} from "../../frame-service"

function AppView() {

    const [fake, set_fake] = useState("fake");
    const [frames, set_frames] = useState();

    const success = data => {
        set_frames(data);
    }
    const top_on_click = () => {
        FrameService.pop_frames({terms: {success}});
        console.log("TOP ON CLICK")
        //FrameService.create_frame({terms: {body: {name: "fake"}, success }})
    }

    const [mode, set_mode] = useState(App.PIN_MODE);
    return (
    <div className="app">
      <header className="app-header">
          <h1 onClick={top_on_click}>Artspresso {fake}</h1>
      </header>
      <div className="app-main">
          <WorkspaceView mode={mode} frames={frames} />
          <ControlFrameView mode={mode} set_mode={set_mode} />
      </div>
    </div>
  );
}


export default AppView;