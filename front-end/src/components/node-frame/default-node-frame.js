import NodeFrameView, {NodeFrame} from "./";

function brew() {
    return NodeFrame.brew({
        terms: {
            model_view: NodeFrameView,
            creation_datetime: Date.now(),
        }
    })
}

export {
    brew,
}