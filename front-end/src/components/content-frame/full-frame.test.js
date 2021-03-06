import {FullFrame, ContentFrame} from "../content-frame";
import {Pin, Jet, Whole} from "../../modals";
import {App} from "../app";
import {FrameService} from "../../frame-service";

describe("assign_full_handlers", () => {
    const setter = jest.fn();
    describe("pass a create-mode app-data, a full content_frame and a state-setter ", () => {
        it ("calls frame service to create a node-frame", () => {
            jest.clearAllMocks();
            const app_data = {mode: App.PIN_MODE};
            const full_frame = ContentFrame.brew({terms: {arcs: []}, mixins: [Whole.brew]});
            const event = {pageX: "200px", pageY: "300px"};
            const new_full = FullFrame.assign_full_handlers({app_data, full_frame, setter});
            //const on_click = jest.spyOn(Pin, "full_pin_on_click");
            const on_click = jest.spyOn(FrameService, "create_frame");
            new_full.get_on_click()(event);
            expect(on_click).toBeCalled();
        });
    });
    describe("pass an arrange-mode app-data, a full content_frame and a state-setter ", () => {
        it ("sets to full_jet_on_mouse_move", () => {
            const app_data = {mode: App.JET_MODE};
            const full_frame = ContentFrame.brew({terms: {}})
            const new_full = FullFrame.assign_full_handlers({app_data, full_frame, setter});
            expect(full_frame.onClick).toBeUndefined()
            jest.spyOn(Jet,"full_jet_on_mouse_move");
            const event = {};
            new_full.get_on_mouse_move()(event);
            expect(Jet.full_jet_on_mouse_move).toBeCalledWith(expect.objectContaining({app_data, event}));
        });
        it ("sets to full_jet_on_mouse_up", () => {
            const app_data = {mode: App.JET_MODE};
            const full_frame = ContentFrame.brew({terms: {arcs: []}});
            const setter = jest.fn()
            const new_full = FullFrame.assign_full_handlers({app_data, full_frame, setter});
            expect(full_frame.get_on_click()).toBeUndefined()
            jest.spyOn(Jet,"full_jet_on_mouse_up");
            new_full.get_on_mouse_up()();
            expect(Jet.full_jet_on_mouse_up).toBeCalledWith(expect.objectContaining({
                app_data, full_frame: expect.objectContaining({
                    signature: full_frame.signature
                })
                , setter}));
        });
    });
    describe("pass a mode-less app-data ", () => {
        it ("returns nothing", () => {
            const app_data = {};
            const full_frame = FullFrame.brew({terms: {arcs: []}});
            const setter = jest.fn();
            const new_full_frame = FullFrame.assign_full_handlers({app_data, full_frame, setter});
            expect(new_full_frame).toBeUndefined();
        });
    });
});

