import {Me} from "../helpers";
import Arc from "../components/arc";
import {BaseFrame} from "../components/content-frame";
import {DefaultNodeFrame, NodeFrame} from "../components/node-frame";
import {FrameService} from "../frame-service";
import {Jetter} from "../modals"

function tie_base_frames({source, sink, full_frame, setter}) {
    let success = async (data) => {
        const terms = data[0];
        const x_delta = sink.get_left() - source.get_left();
        const y_delta = sink.get_top() - source.get_top();
        const left = source.get_left() + (x_delta / 2);
        const top = source.get_top() + (y_delta / 2);

        const sense = BaseFrame.brew({model: NodeFrame.brew({terms}), left, top});

        let success2 = async (data) => {
            const terms = data[0];
            const arc = Arc.brew({terms}).with_sense({sense}).with_sink({sink});
            const state = full_frame.without_part(source.get_id()).with_part(sense).with_part(source.with_arc({arc}));
            Me.return_state({state, setter});
        }
        FrameService.create_arc({terms: {success: success2, body: {
                    source: source.get_model().get_identity(),
                    sense: sense.get_model().get_identity(),
                    sink: sink.get_model().get_identity()
        }}});
    }
    FrameService.create_frame({terms: {success, body: {name: ""}}})
}

function base_tie_on_click({event, full_frame, base_frame, app_data, setter}) {
    if (!app_data.tie_source) {
        const left = Jetter.left_when_middle_is(
            {x: event.pageX, half_width: BaseFrame.HALF_BASE_WIDTH}
        );
        const top = Jetter.top_when_middle_is(
            {y: event.pageY, half_height: BaseFrame.HALF_BASE_HEIGHT}
        );
        app_data.tie_source = BaseFrame.brew({
            model: base_frame.get_model(),
            left: left,
            top: top,
        })
    } else {
        const source = app_data.tie_source;
        const sink = base_frame;
        tie_base_frames({source, sink, full_frame, setter});
        app_data.tie_source = undefined;
    }
}

export {
    base_tie_on_click,
}