import {FullFrame, BaseFrame} from "../content-frame";
import {DefaultNodeFrame, NodeFrame} from "../node-frame";
import Arc from "../arc"

function get_initial_workspace({mode, frames}) {
    let arcs;
    if (frames) {
        arcs = frames.map(frame => {
            return Arc.brew({terms: {
                    sense: Arc.HAVE_PART,
                    sink: BaseFrame.brew({model: NodeFrame.brew({terms: {pk: frame.pk, fields: frame.fields}})})
                }})
        });
    }
    return FullFrame.brew({
        mode: mode,
        model: DefaultNodeFrame.brew(),
        arcs: arcs,
    });
}

function assign_handlers({app_data, full_frame, setter}) {
    const content_with_handlers = FullFrame.assign_full_handlers({
        app_data, full_frame: full_frame.with_reset_handlers(), setter
    });
    return content_with_handlers.with_parts(content_with_handlers.get_parts().map(base_frame =>
        BaseFrame.assign_base_handlers({
            app_data,
            full_frame: content_with_handlers,
            base_frame: base_frame.with_reset_handlers(),
            setter
        })
    ));
}

export {
    get_initial_workspace,
    assign_handlers,
}