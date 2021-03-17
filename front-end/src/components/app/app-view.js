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
        const node_frame_map = {};
        if (frames) {
            frames.node_frames.forEach(terms => {
                const node_frame = BaseFrame.brew({model: NodeFrame.brew({terms})})
                node_frame_map[terms.id] = node_frame;
            });
            //commented code here was a start at having duplicated content-frames
            //for sense nodes when used for more than one arc
            //const arc_map = {}
            //const senses = [];
            frames.arcs.forEach(terms => {
                const source_id= terms.source;
                const sense_id= terms.sense;
                const sink_id= terms.sink;
                const source = node_frame_map[source_id];
                const sense = node_frame_map[sense_id];
                const sink = node_frame_map[sink_id];
                const arc = Arc.brew({terms: {sense, sink}} )
                //senses.push(BaseFrame.brew({arc_id: terms.id, model: sense.get_model()}))
                //arc_map[sense_id] = terms;
                node_frame_map[source_id] = source.with_arc({arc});
            })
            arcs = Object.values(node_frame_map).map(node_frame => {
                return Arc.brew({terms: {
                        sense: Arc.HAVE_PART,
                        sink: node_frame,
                    }});
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
        FrameService.find_associates({terms: {pk: "17791", success}})
        //FrameService.pop_frames({terms: {success}});
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