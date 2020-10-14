import {Jet, Jetter} from "./";
import {BaseFrame} from "../components/content-frame";
import {Me} from "../helpers"

function full_jet_on_mouse_move({app_data, event}) {
    if (app_data.arrange_frame) {
        app_data.arrange_frame.style.left = Jetter.left_when_middle_is(
            {x: event.pageX, half_width: BaseFrame.HALF_BASE_WIDTH}
        );
        app_data.arrange_frame.style.top = Jetter.top_when_middle_is(
            {y: event.pageY, half_height: BaseFrame.HALF_BASE_HEIGHT}
        );
    }
}

function jet_base_frame({app_data, full_frame}) {
    const id = app_data.arrange_frame.id;
    const left = app_data.arrange_frame.style.left;
    const top = app_data.arrange_frame.style.top;

    app_data.arrange_frame = undefined;

    const new_part = full_frame.see_part(id).jet({left, top});
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
