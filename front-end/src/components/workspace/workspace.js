import {FullFrame, BaseFrame} from "../content-frame"
import {DefaultNodeFrame} from "../node-frame";

function get_initial_workspace({mode}) {
    return FullFrame.brew({
        mode,
        model: DefaultNodeFrame.brew(),
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