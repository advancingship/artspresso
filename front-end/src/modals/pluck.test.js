import {Pluck, Jetter, Whole} from "./";
import Arc from "../components/arc"
import {BaseFrame, ContentFrame} from "../components/content-frame";
import {Me} from "../helpers";
import {DefaultNodeFrame} from "../components/node-frame";

    describe("pluck_base_frame", () => {
    let full_frame, part_id, arc_a, arc_b, arc_c, arc_d, model, have_part, not_have_part, new_frame;
    beforeEach(() => {
        part_id = 1;
        have_part = Arc.HAVE_PART;
        not_have_part = BaseFrame.brew({model: DefaultNodeFrame.brew(), left: "0", top: "0"});
        arc_a = Arc.brew({terms: {sense: have_part, sink:
                    ContentFrame.brew({terms: {id: 3}, mixins: [Jetter.brew]})
            }});
        arc_b = Arc.brew({terms: {sense: have_part, sink:
                    ContentFrame.brew({terms: {id: part_id}, mixins: [Jetter.brew]})
            }});
        arc_c = Arc.brew({terms: {sense: not_have_part, sink:
                    ContentFrame.brew({terms: {id: part_id}, mixins: [Jetter.brew]})
            }});
        arc_d = Arc.brew({terms: {sense: have_part, sink:
                    ContentFrame.brew({terms: {id: 6}, mixins: [Jetter.brew]})
            }});
        model = Me.brew({terms: {arcs: [arc_a, arc_b, arc_c, arc_d]}});
    });
    it("removes a base-frame from the full-frame", () => {
        full_frame = ContentFrame.brew({
            terms: {
                arcs: [arc_a, arc_b, arc_c, arc_d],
                model: model,
            }, mixins: [Whole.brew]
        });
        new_frame = Pluck.pluck_base_frame({full_frame, part_id});
        expect(new_frame.get_parts().map(part => part.get_id())).toStrictEqual([
            arc_a.get_sink().get_id(), arc_d.get_sink().get_id()
        ])
    });
});

describe("base_pluck_on_click", () => {
    describe("pass a full-frame, a base-frame id and the state-setter", () => {
        let full_frame, part_id, setter;
        part_id = "part-id"
        beforeEach(() => {
            full_frame = ContentFrame.brew({
                terms: {
                    model: Me.brew({terms: {arcs: [{target: {}}]}}),
                    arcs: [Arc.brew({terms: {sense: Whole.HAVE_PART, sink: ContentFrame.brew({terms: {id: part_id}})}})],
                }, mixins: [Whole.brew]
            });
            setter = jest.fn();
        });
        it ("calls pluck_base_frame with the full-frame and the id", () => {
            const remove = jest.spyOn(Pluck, "pluck_base_frame");
            Pluck.base_pluck_on_click({full_frame, part_id, setter});
            expect(remove).toBeCalledWith({full_frame, part_id})
        })
        it ("calls return_state with the full-frame", () => {
            const rtn_state = jest.spyOn(Me, "return_state");
            jest.spyOn(Pluck, "pluck_base_frame")
                .mockImplementationOnce(() => {
                    return full_frame;
                })
            Pluck.base_pluck_on_click({full_frame, part_id, setter});
            expect(rtn_state).toHaveBeenLastCalledWith({state: full_frame, setter});
        });
    });
});
