import NodeFrameView, {NodeFrame} from "./";

describe("brew", () => {
    it("creates a node-frame with a model-view to render", () => {
        const node_frame = NodeFrame.brew({
            terms: {
                model_view: NodeFrameView,
            }
        });
        expect(node_frame.get_model_view()).toStrictEqual(NodeFrameView)
    })
})