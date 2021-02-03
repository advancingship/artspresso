import {Me} from "../helpers";
import Arc from "../components/arc";
import {BaseFrame} from "../components/content-frame";
import {DefaultNodeFrame} from "../components/node-frame";


function tie_base_frames({source, sink, full_frame}) {
    const x_delta = sink.get_left() - source.get_left();
    const y_delta = sink.get_top() - source.get_top();
    const left = source.get_left() + (x_delta / 2);
    const top = source.get_top() + (y_delta / 2);
    const sense = BaseFrame.brew({model: DefaultNodeFrame.brew(), left, top});
    return full_frame.without_part(source.get_id()).with_part(sense).with_part(source.with_arc({
        arc: Arc.brew({
            terms: {
                sense: sense,
                sink: sink,
            }
        })
    }))
}

function base_tie_on_click({full_frame, base_frame, app_data, setter}) {
    if (!app_data.tie_source) {
        app_data.tie_source = base_frame
    } else {
        const state = tie_base_frames({source: app_data.tie_source, sink: base_frame, full_frame});
        app_data.tie_source = undefined;
        return Me.return_state({state, setter});
    }
}

export {
    base_tie_on_click,
}