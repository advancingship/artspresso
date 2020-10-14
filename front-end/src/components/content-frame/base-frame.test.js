import {Jet, Pluck, Whole} from "../../modals";
import {ContentFrame} from "../content-frame"
import Arc from "../arc";
import {Me} from "../../helpers";
import {BaseFrame} from "../content-frame";
import {App} from "../app";

describe("assign_base_handlers", () => {
    let child_a, child_b, child_c, part_id, setter;
    beforeEach(() => {
        part_id = 1;
        child_a = ContentFrame.brew({terms: {id: 0}});
        child_b = ContentFrame.brew({terms: {id: part_id}});
        child_c = ContentFrame.brew({terms: {id: 2}});
        setter = jest.fn();
    });
    describe("pass a delete-mode app-data, a full-frame, a base-frame, and the state-setter ", () => {
        it ("sets to base_pluck_on_click", () => {
            const app_data = {mode: App.PLUCK_MODE};
            const full_frame = ContentFrame.brew({
                terms: {
                    model: Me.brew({terms: {arcs: [{sink: {}},{sink: {}},{sink: {}}]}}),
                    arcs: [
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: child_a}}),
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: child_b}}),
                        Arc.brew({terms: {sense: Whole.HAVE_PART, sink: child_c}}),
                    ],
                },
                mixins: [Whole.brew]
            });
            const on_click = jest.spyOn(Pluck, "base_pluck_on_click");
            const new_base_frame = BaseFrame.assign_base_handlers({app_data, full_frame, base_frame: child_b, setter});
            new_base_frame.get_on_click()();
            expect(on_click).toBeCalledWith({full_frame, part_id, setter});
        });
    });
    describe("pass an arrange-mode app-data, a base content_frame and state-setter ", () => {
        it ("sets to base_jet_on_mouse_down", () => {
            const app_data = {mode: App.JET_MODE};
            const full_frame = ContentFrame.brew({
                terms: {
                    arcs: [{sink: child_a}, {sink: child_b}, {sink: child_c}]
                }
            });
            const set_content = jest.fn();
            const event = {currentTarget: {id: part_id}}
            const on_mouse_down = jest.spyOn(Jet, "base_jet_on_mouse_down");
            const new_base_frame = BaseFrame.assign_base_handlers({app_data, full_frame, base_frame: child_b, set_content});
            new_base_frame.get_on_mouse_down()(event);
            expect(on_mouse_down).toBeCalledWith({app_data, sink: event.currentTarget});
        });
    });
});
