import React from "react";
import {useState} from "react";
import {Workspace} from "./"
import ContentFrameView from "../content-frame";

export default function WorkspaceView({app_data, full_frame, setter}) {

    const workspace = Workspace.assign_handlers({app_data, full_frame, setter});

    return (
        <ContentFrameView {...workspace} />
    )

}