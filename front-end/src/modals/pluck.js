import {Pluck} from "./index"
import {Me} from "../helpers"

function pluck_base_frame({full_frame, part_id}) {
    let new_full_frame = full_frame;
    new_full_frame = new_full_frame.without_part(part_id);
    return new_full_frame;
}

function base_pluck_on_click({full_frame, part_id, setter}) {
    Me.return_state({state: Pluck.pluck_base_frame({full_frame, part_id}), setter});
}

function base_jet_on_mouse_down({app_data, sink}) {
    app_data.arrange_frame = sink;
}

export {
    pluck_base_frame,
    base_pluck_on_click,
    base_jet_on_mouse_down
}
