import React from "react";
import {useState} from "react";
import {Workspace} from "./"
import ContentFrameView from "../content-frame";

export default function WorkspaceView({mode, frames}) {

    const app_data = {mode};
    const [full_frame, setter] = useState(Workspace.get_initial_workspace({mode, frames}));
    const workspace = Workspace.assign_handlers({app_data, full_frame, setter});
    return (
        <ContentFrameView {...workspace} />
    )

}