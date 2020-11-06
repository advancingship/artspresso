import {ContentFrame} from "./";
import {App} from "../app";
import {Pluck, Jet, Jetter} from "../../modals";
import {Me} from "../../helpers";

const BASE_WIDTH = 220;
const BASE_HEIGHT = 80;
const HALF_BASE_WIDTH = BASE_WIDTH/2;
const HALF_BASE_HEIGHT = BASE_HEIGHT/2;
const SPACE = " ";
const NODE_FRAME_STYLE_NAME = "node-frame";
const BASE_FRAME_STYLE_NAME = "base-frame";
const BASE_NODE_STYLE_NAMES = BASE_FRAME_STYLE_NAME + SPACE + NODE_FRAME_STYLE_NAME;

function brew({model, left, top}) {
    return ContentFrame.brew({
        terms: {
            id: BASE_FRAME_STYLE_NAME + Date.now(),
            model,
            class_name: BASE_NODE_STYLE_NAMES,
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            left: left,
            top: top,
        },
        mixins: [Jetter.brew],
    })
}

function assign_base_handlers({app_data, full_frame, base_frame, setter}) {
    const new_base_frame = base_frame.with_name_on_input({
        name_on_input: field_on_input({
            base_frame, full_frame, method_name: "with_name", argument_name: "name", setter
        })
    }).with_content_on_input({
        content_on_input: field_on_input({
            base_frame, full_frame, method_name: "with_content", argument_name: "content", setter
        })
    });
    if (app_data.mode === App.PIN_MODE) {
        return new_base_frame.with_on_click({
            on_click: (event) => {
                event.preventDefault();
                event.stopPropagation();
            }
        })
    } else if (app_data.mode === App.PLUCK_MODE) {
        return new_base_frame.with_on_click({
            on_click: () => {
                Pluck.base_pluck_on_click({full_frame, part_id: new_base_frame.get_id(), setter});
            }
        })
    } else if (app_data.mode === App.JET_MODE) {
        return new_base_frame.with_on_mouse_down({
            on_mouse_down: (event) => {
                Jet.base_jet_on_mouse_down({app_data, sink: event.currentTarget});
            }
        })
    }
}

function field_on_input({base_frame, full_frame, setter, method_name, argument_name}) {
    const id = base_frame.get_id();
    return ({value}) => {
        const argument = {};
        argument[argument_name] = value;
        return Me.return_state({
            state: full_frame.without_part(id).with_part(full_frame.get_part(id).with_model({
                model: base_frame.get_model()[method_name](argument)
            })),
            setter
        });
    }
}

export {
    brew,
    assign_base_handlers,
    BASE_HEIGHT,
    BASE_WIDTH,
    HALF_BASE_HEIGHT,
    HALF_BASE_WIDTH,
    field_on_input,
}