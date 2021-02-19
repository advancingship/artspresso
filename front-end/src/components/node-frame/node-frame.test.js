import NodeFrameView, {NodeFrame} from "./";
import {App} from "../app";
//axios.defaults.adapter = require('axios/lib/adapters/http')

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
    it( "stores a node-frame on the back-end", async () => {
        const node_frame = NodeFrame.brew({
            terms: {
                name: "name1"
            }
        });
        let result_items, result_error;
        await fetch(App.URLS.back_end_api + "/frames/", {
            mode: 'no-cors'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    result_items = JSON.parse(result)[0]
                },
                (error) => {
                    result_error = error;
                });
        expect(result_error).toBeUndefined();
        expect(result_items).toStrictEqual({"fake" : "fake"});
    });
});
