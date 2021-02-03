import {Jet, Jetter, Whole} from "./";
import Arc from "../components/arc";
import {ContentFrame} from "../components/content-frame";
import {Me}  from "../helpers";


describe("full_jet_on_mouse_move", () => {
    describe("pass the app-data an event and a full-frame", () => {
        let event, app_data, full_frame, arc_a;
        beforeEach(() => {
            app_data = {arrange_frame: {style: {}, id: 3}};
            event = {pageX: "200", pageY: "300"};
            arc_a = Arc.brew({terms: {sense: Whole.HAVE_PART, sink: ContentFrame.brew({terms: {id: 3}, mixins: [Jetter.brew]})}});
            full_frame = ContentFrame.brew({terms: {arcs: [arc_a]}, mixins: [Whole.brew]});
        });
        describe("whe arrange_frame is defined in app_data", () => {
            it("sets the top and left of a base-frame", () => {
                Jet.full_jet_on_mouse_move({app_data, event, full_frame});
                expect(app_data.arrange_frame.style.left).toBeDefined();
                expect(app_data.arrange_frame.style.top).toBeDefined();
            });
        });
        describe("whe arrange_frame is null or undefined", () => {
            it("it does nothing", () => {
                app_data = {};
                Jet.full_jet_on_mouse_move({app_data, event});
                expect(app_data).toStrictEqual(app_data);
            });
        });
    });
});

describe("jet", () => {
    const setter = jest.fn();
    let app_data, full_frame, arc_a, arc_b, arc_c;
    beforeEach(() => {
        app_data = {arrange_frame: {id: 1, style: {left: "200px", top: "400px"}}};
        arc_a = Arc.brew({terms: {sense: Whole.HAVE_PART, sink: ContentFrame.brew({terms: {id: 3}})}, mixins: [Jetter.brew]});
        arc_b = Arc.brew({terms: {sense: Whole.HAVE_PART, sink: ContentFrame.brew({terms: {id: app_data.arrange_frame.id}, mixins: [Jetter.brew]})}});
        arc_c = Arc.brew({terms: {sense: Whole.HAVE_PART, sink: ContentFrame.brew({terms: {id: 5}, mixins: [Jetter.brew]})}});
        full_frame = ContentFrame.brew({terms: {arcs: [arc_a, arc_b, arc_c]}, mixins: [Whole.brew]});
    })
    describe("jet_base_frame", () => {
        it( "sets the arrange-frame to null to stop the motion", () => {
            Jet.jet_base_frame({app_data, full_frame});
            expect(app_data.arrange_frame).toBeUndefined();
        });
        it ("sets the left, and top of a base-frame", () => {
            const new_content_frame = Jet.jet_base_frame({app_data: {...app_data}, full_frame});
            expect(new_content_frame.get_parts()[2].get_left()).toBeDefined();
            expect(new_content_frame.get_parts()[2].get_top() + "px").toEqual(app_data.arrange_frame.style.top);
        });
    });

    describe("full_jet_on_mouse_up", () => {
        describe("pass the app-data, the full-frame and the setter", () => {
            describe("when arrange-frame is non-null", () => {
                it("calls jet_base_frame to set the final position", () => {
                    const mover = jest.spyOn(Jet,"jet_base_frame");
                    Jet.full_jet_on_mouse_up({app_data, full_frame, setter});
                    expect(mover).toBeCalledWith({app_data, full_frame});
                });
                it( "calls return_state with the result of jet_base_frame", () => {
                    const state_return = jest.spyOn(Me, "return_state");
                    jest.spyOn(Jet, "jet_base_frame").mockImplementationOnce(() => {
                        return full_frame;
                    })
                    Jet.full_jet_on_mouse_up({app_data, full_frame, setter});
                    expect(state_return).toHaveBeenLastCalledWith({state: full_frame, setter})
                });
            });
        });
    });
});

describe("base_jet_on_mouse_down", () => {
    describe("pass the app-data and a base_frame", () => {
        it("sets the event current-target as the arrange-frame to move with the mouse", () => {
            const app_data = {};
            const event = {currentTarget: "<foo/>"};
            Jet.base_jet_on_mouse_down({app_data, sink: event.currentTarget});
            expect(app_data).toStrictEqual({arrange_frame: event.currentTarget});
        });
    });
});

