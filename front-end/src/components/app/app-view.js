import React, {useEffect} from "react";
import "./app.sass";
import {useState} from "react";
import ControlFrameView from "../control-frame";
import WorkspaceView, {Workspace} from "../workspace/";
import {App} from "./";

import {FrameService} from "../../frame-service"
import {FullFrame, BaseFrame} from "../content-frame";
import {DefaultNodeFrame, NodeFrame} from "../node-frame";
import Arc from "../arc"


function AppView() {

    const [mode, set_mode] = useState(App.PIN_MODE);

    //const [fake, set_fake] = useState("fake");
    //const [frames, set_frames] = useState();

    //const success = data => {
        //set_frames(data);
    //}
    function latest_workspace({mode, frames}) {
        let arcs;
        if (frames) {
            arcs = frames.map(terms => {
                return Arc.brew({terms: {
                        sense: Arc.HAVE_PART,
                        sink: BaseFrame.brew({model: NodeFrame.brew({terms})})
                    }})
            });
        }
        return FullFrame.brew({
            mode: mode,
            model: DefaultNodeFrame.brew(),
            arcs: arcs,
        });
    }

    const app_data = {mode};
    const space = Workspace.get_initial_workspace({mode})
    const [full_frame, setter] = useState(space);

    function success(frames) {
        const latest = latest_workspace({mode, frames})
        setter(previous_full_frame => latest);
    }

    function top_on_click() {
        console.log("TOP ON CLICK")
        FrameService.pop_frames({terms: {success}});
        //FrameService.create_frame({terms: {body: {name: "fake"}, success }})
    }

    return (
    <div className="app">
      <header className="app-header">
          <h1 onClick={top_on_click}>Artspresso</h1>
      </header>
      <div className="app-main">
          <WorkspaceView app_data={app_data} full_frame={full_frame} setter={setter} />
          <ControlFrameView mode={mode} set_mode={set_mode} />
      </div>
    </div>
  );
}


export default AppView;