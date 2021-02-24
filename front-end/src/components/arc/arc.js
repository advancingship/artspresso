import {ModelViewable, Timestamped, Identifiable} from "../../modals";

const HAVE_PART = Object.freeze({get_id: () => "have_part"});
const LEFT = "left";
const RIGHT = "right"

const brew = function ({terms}) {
    if (terms && terms.pk) {
        const pk = terms.pk
        terms = terms.fields;
        terms.identity = pk;
    }
    const left_id = terms.identity + "-" + LEFT;
    const right_id = terms.identity + "-" + RIGHT;
    return Object.freeze({
        get_left_id: () => left_id,
        get_right_id: () => right_id,
        get_sense: () => terms.sense,
        get_sink: () => terms.sink,
        with_sense: ({sense}) => brew({terms: {...terms, sense}}),
        with_sink: ({sink}) => brew({terms: {...terms, sink}}),
        ...Identifiable.brew({terms, brewer: brew}),
        ...ModelViewable.brew({terms, brewer: brew}),
        ...Timestamped.brew({terms, brewer: brew}),
    });
}

function hypotenuse({x_delta, y_delta}) {
    return Math.round( Math.sqrt( Math.pow(x_delta, 2) + Math.pow(y_delta, 2)));
}

function arc_line({left_frame, right_frame}) {
    const start_x = left_frame.get_left() + left_frame.get_width();
    const start_y = left_frame.get_top() + (left_frame.get_height() / 2);
    const end_x = right_frame.get_left();
    const end_y = right_frame.get_top() + (right_frame.get_height() /2);
    const x_delta = end_x - start_x;
    const y_delta = end_y - start_y;
    const hypotenuse = Math.round( Math.sqrt( Math.pow(x_delta, 2) + Math.pow(y_delta, 2)));
    const angle = Math.atan2((y_delta), (x_delta)) *  (180/Math.PI);
    const source_sink_string = "source_" + left_frame.get_id() + " sink_"+right_frame.get_id();
    return {
        className: source_sink_string,
        style: {
            position: "fixed",
            width: hypotenuse + "px",
            height: "0px",
            left: start_x,
            top: start_y,
            WebkitTransformOrigin: "0% 0%",
            WebkitTransform: "rotate(" + angle + "deg)",
            border: "solid",
        }
    }
}

export {
    brew,
    HAVE_PART,
    hypotenuse,
    arc_line,
}