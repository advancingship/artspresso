const FIXED = "fixed";
const RELATIVE = "relative";
const PX = "px";

function brew({terms, mixins, brewer = brew}) {
    return Object.freeze({
        jet: ({left, top}) => brewer({terms: {...terms, left, top}, mixins, brewer}),
        get_position: () => ((terms.left || terms.top) ? FIXED : RELATIVE),
        get_left: () => terms.left,
        get_top: () => terms.top,
        get_width: () => terms.width,
        get_height: () => terms.height,
    });
}

function left_when_middle_is({x, half_width}) {
    return x - half_width;
}

function top_when_middle_is({y, half_height}) {
    return y - half_height;
}

export {
    brew,
    left_when_middle_is,
    top_when_middle_is,
    PX,
    FIXED
}