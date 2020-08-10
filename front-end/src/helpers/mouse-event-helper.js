// See : https://github.com/testing-library/react-testing-library/issues/268
class FakeMouseEvent extends MouseEvent {
    constructor(type, values) {
        const { pageX, pageY, offsetX, offsetY, x, y, key, touches, ...mouseValues } = values;
        super(type, mouseValues);

        Object.assign(this, {
            offsetX: offsetX || 0,
            offsetY: offsetY || 0,
            pageX: pageX || 0,
            pageY: pageY || 0,
            x: x || 0,
            y: y || 0,
            touches,
            key,
        });
    }
}

function get_fake_mouse_event(type, values) {
    return new FakeMouseEvent(type, values);
}


export {
    get_fake_mouse_event,
};
