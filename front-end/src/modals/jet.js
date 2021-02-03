import {Jet, Jetter} from "./";
import {BaseFrame} from "../components/content-frame";
import {Me} from "../helpers";
import Arc from "../components/arc";

function full_jet_on_mouse_move({app_data, event, full_frame}) {
    if (app_data.arrange_frame) {
        const left = Jetter.left_when_middle_is(
            {x: event.pageX, half_width: BaseFrame.HALF_BASE_WIDTH}
        );
        app_data.arrange_frame.style.left = left + Jetter.PX;
        const top = Jetter.top_when_middle_is(
            {y: event.pageY, half_height: BaseFrame.HALF_BASE_HEIGHT}
        );
        app_data.arrange_frame.style.top = top + Jetter.PX;
        const id = app_data.arrange_frame.id;
        const frame = full_frame.get_part(id).jet({left, top});
        const to_arcs = [...document.getElementsByClassName("sink_" + id)];
        const from_arcs = [...document.getElementsByClassName("source_" + id)];
        if (to_arcs) {
            to_arcs.forEach(arc_line => {
                const left_id = arc_line.classList[0].split("_")[1];
                const left_frame = full_frame.get_part(left_id);
                const right_frame = frame;
                const new_arc_line = Arc.arc_line({left_frame, right_frame})
                arc_line.style.width = new_arc_line.style.width;
                arc_line.style.WebkitTransform = new_arc_line.style.WebkitTransform;
            });
        }
        if (from_arcs) {
            from_arcs.forEach(arc_line => {
                const right_id = arc_line.classList[1].split("_")[1];
                const right_frame = full_frame.get_part(right_id);
                const left_frame = frame;
                const new_arc_line = Arc.arc_line({left_frame, right_frame})
                arc_line.style.left = new_arc_line.style.left + Jetter.PX;
                arc_line.style.top = new_arc_line.style.top + Jetter.PX;
                arc_line.style.width = new_arc_line.style.width;
                arc_line.style.WebkitTransform = new_arc_line.style.WebkitTransform;
            });
        }
    }
}

function jet_base_frame({app_data, full_frame}) {
    const id = app_data.arrange_frame.id;
    const left = app_data.arrange_frame.style.left;
    const top = app_data.arrange_frame.style.top;

    app_data.arrange_frame = undefined;

    const new_part = full_frame.get_part(id).jet({left: parseInt(left.substring(0, left.length - 2)), top: parseInt(top.substring(0, top.length - 2))});
    return full_frame.without_part(id).with_part(new_part)
}

function full_jet_on_mouse_up({app_data, full_frame, setter}) {
    if (app_data.arrange_frame) {
        const new_content_frame = Jet.jet_base_frame({app_data, full_frame});
        Me.return_state({state: new_content_frame, setter});
    }
}

function base_jet_on_mouse_down({app_data, sink}) {
    app_data.arrange_frame = sink;
}

export {
    full_jet_on_mouse_move,
    full_jet_on_mouse_up,
    base_jet_on_mouse_down,
    jet_base_frame,
}
