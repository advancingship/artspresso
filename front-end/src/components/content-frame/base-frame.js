import {ContentFrame} from "./";
import {App} from "../app";
import {Pluck, Jet, Jetter} from "../../modals";

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
    if (app_data.mode === App.PIN_MODE) {
        return base_frame.with_on_click({
            on_click: (event) => {
                event.preventDefault();
                event.stopPropagation();
            }
        })
    } else if (app_data.mode === App.PLUCK_MODE) {
        return base_frame.with_on_click({
            on_click: () => {
                Pluck.base_pluck_on_click({full_frame, part_id: base_frame.get_id(), setter});
            }
        })
    } else if (app_data.mode === App.JET_MODE) {
        return base_frame.with_on_mouse_down({
            on_mouse_down: (event) => {
                Jet.base_jet_on_mouse_down({app_data, sink: event.currentTarget});
            }
        })
    }
}

export {
    brew,
    assign_base_handlers,
    BASE_HEIGHT,
    BASE_WIDTH,
    HALF_BASE_HEIGHT,
    HALF_BASE_WIDTH,
}