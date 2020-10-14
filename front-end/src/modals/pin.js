import {Pin} from "./"
import {Me} from "../helpers"

function pin_base_frame({full_frame, model}) {
    return full_frame.with_part(model);
}

function full_pin_on_click({full_frame, model, setter}) {
    const new_content_frame = Pin.pin_base_frame({full_frame, model});
    Me.return_state({state: new_content_frame, setter})
}

export {
    pin_base_frame,
    full_pin_on_click,
}