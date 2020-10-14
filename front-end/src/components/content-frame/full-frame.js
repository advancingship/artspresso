import {BaseFrame, ContentFrame} from "./"
import {Pin, Jet, Jetter, Whole} from "../../modals"
import {App} from "../app"
import {DefaultNodeFrame} from "../node-frame"

const SPACE = " ";
const FULL_FRAME_STYLE_NAME = "full-frame";
const NODE_FRAME_STYLE_NAME = "node-frame";
const FULL_NODE_STYLE_NAMES = FULL_FRAME_STYLE_NAME + SPACE + NODE_FRAME_STYLE_NAME;

function brew({mode, model}) {
    return ContentFrame.brew({
        terms: {
            class_name: FULL_NODE_STYLE_NAMES,
            mode,
            model,
            arcs: [],
        },
        mixins: [Whole.brew]
    });
}

function assign_full_handlers({app_data, full_frame, setter}) {
    if (app_data.mode === App.PIN_MODE) {
        return full_frame.with_on_click({
            on_click: (event) => {
                Pin.full_pin_on_click({full_frame, event,
                    model: BaseFrame.brew({
                        model: DefaultNodeFrame.brew(),
                        left: Jetter.left_when_middle_is({x: event.pageX, half_width: BaseFrame.HALF_BASE_WIDTH}),
                        top: Jetter.top_when_middle_is({y: event.pageY, half_height: BaseFrame.HALF_BASE_HEIGHT}),
                    }),
                    setter});
            }
        });
    } else if (app_data.mode === App.PLUCK_MODE) {
        return full_frame;
    } else if (app_data.mode === App.JET_MODE) {
        return full_frame.with_on_mouse_move({
            on_mouse_move: (event) => {
                Jet.full_jet_on_mouse_move({app_data, event})
            }})
            .with_on_mouse_up({
                on_mouse_up: () => {
                    Jet.full_jet_on_mouse_up({app_data, full_frame, setter})
                }
            });
    }
}



export {
    brew,
    assign_full_handlers,
}
