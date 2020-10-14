import {Pin, Whole} from "./";
import Arc from "../components/arc";
import {BaseFrame, ContentFrame} from "../components/content-frame";
import {Me} from "../helpers";
import {DefaultNodeFrame} from "../components/node-frame";

describe("pin_base_frame", () => {
    describe("pass a full-frame and a new model", () => {
        it("returns the full-frame with a new base-frame at the coordinates of left and top", () => {
            const full_frame = ContentFrame.brew({
                terms: {
                    arcs: [
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: {}}}),
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: {}}})
                    ]
                },
                mixins: [Whole.brew]
            });
            const left = "200px";
            const top = "300px";
            const model = BaseFrame.brew({model: DefaultNodeFrame.brew(), left, top})
            const new_content_frame = Pin.pin_base_frame({full_frame, model});
            expect(new_content_frame.get_parts()).toHaveLength(3);
            expect(new_content_frame.get_parts()[2].get_left()).toEqual(left)
            expect(new_content_frame.get_parts()[2].get_top()).toEqual(top)
        });
    });
});

describe("full_pin_on_click", () => {
    describe("pass a full-frame, an event, and a state-setter", () => {
        let event, full_frame;
        beforeEach(() => {
            event = {pageX: "200", pageY: "300"};
            full_frame = ContentFrame.brew({
                terms: {
                    arcs: [
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: {}}}),
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: {}}})
                    ]
                }, mixins: [Whole.brew]
            });
        });
        it("calls pin_base_frame to add a new base frame at the event position", () => {
            const add_base = jest.spyOn(Pin, "pin_base_frame");
            Pin.full_pin_on_click({full_frame, event, setter: jest.fn()});
            expect(add_base).toBeCalled();
        });
        it("calls return_state", () => {
            const state_function = jest.spyOn(Me, "return_state");
            const full_frame = ContentFrame.brew({
                terms: {
                    arcs: [
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: {}}}),
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: {}}})
                        ],
                }, mixins: [Whole.brew]
            });
            const setter = jest.fn();
            Pin.full_pin_on_click({full_frame, event: {}, setter});
            expect(state_function).toBeCalled();
        });
    });
});

