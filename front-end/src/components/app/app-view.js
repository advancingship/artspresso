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

    const arc_sense_id_separator = '>';

    function latest_workspace({mode, frames}) {
        const sense_map = {}
        frames.arcs.forEach(terms => {
            const arc_id = terms.id;
            const sense_id = terms.sense;
            if (sense_map[sense_id]) {
                sense_map[sense_id].push(terms);
            } else {
                sense_map[sense_id] = [terms];
            }
        })
        let have_part_arcs;
        const node_frame_map = {};
        if (frames) {
            frames.node_frames.forEach(terms => {
                const arc_data = sense_map[terms.id]
                let node_frame;
                if (arc_data) {
                    arc_data.forEach(arc_terms => {
                        const arc_id = arc_terms.id;
                        const sense_id = arc_terms.sense;
                        const arc_sense_id = arc_id + arc_sense_id_separator + sense_id;
                        terms = {...terms}
                        terms.id = arc_sense_id;
                        node_frame = BaseFrame.brew({model: NodeFrame.brew({terms})})
                        node_frame_map[terms.id] = node_frame;
                    })
                } else {
                    node_frame = BaseFrame.brew({model: NodeFrame.brew({terms})})
                    node_frame_map[terms.id] = node_frame;
                }
            });
            //commented code here was a start at having duplicated content-frames
            //for sense nodes when used for more than one arc
            //const arc_map = {}
            //const senses = [];
            frames.arcs.forEach(terms => {
                const id = terms.id
                const source_id= terms.source;
                const sense_id= terms.sense;
                const sink_id= terms.sink;
                const source = node_frame_map[source_id];
                //senses should have special arc-related ids because they can be duplicated in the view
                const arc_sense_id = id + arc_sense_id_separator + sense_id;
                const sense = node_frame_map[arc_sense_id];
                const sink = node_frame_map[sink_id];
                const arc = Arc.brew({terms: {id, sense, sink}} )
                node_frame_map[source_id] = source.with_arc({arc});
            })
            have_part_arcs = Object.values(node_frame_map).map(node_frame => {
                return Arc.brew({terms: {
                        sense: Arc.HAVE_PART,
                        sink: node_frame,
                    }});
            });
        }
        return FullFrame.brew({
            mode: mode,
            model: DefaultNodeFrame.brew(),
            arcs: have_part_arcs,
        });
    }

    const app_data = {mode};
    const space = Workspace.get_initial_workspace({mode})
    const [full_frame, setter] = useState(space);

    function success(frames) {
        const latest = latest_workspace({mode, frames})
        setter(previous_full_frame => latest);
        return latest;
    }

    function top_on_click() {
        FrameService.find_associates({terms: {pk: "17791", success}})
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