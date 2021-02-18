import NodeFrameView, {NodeFrame} from "./";
import {App} from "../app";

describe("brew", () => {
    it("creates a node-frame with a model-view to render", () => {
        const node_frame = NodeFrame.brew({
            terms: {
                model_view: NodeFrameView,
            }
        });
        expect(node_frame.get_model_view()).toStrictEqual(NodeFrameView)
    })
});
describe("store", () => {
    it( "stores a node-frame on the back-end", () => {
        const node_frame = NodeFrame.brew({
            terms: {
                name: "name1"
            }
        });
        let result_items, result_error;
        fetch("http://" + App.URLS.back_end_api)
            .then(res => res.json())
            .then(
                (result) => {
                    result_items = result.items
                },
                (error) => {
                    result_error = error;
                });
        expect(result_items).toStrictEqual({"fake" : "fake"});
    });
});
