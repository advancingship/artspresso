import React, { useState } from "react";
import NodeFrame from "../node-frame";

const BASE_WIDTH = "220";
const BASE_HEIGHT = "80";

export default function useNodeFrame(props) {
    const test_id = props.test_id || "node-frame-test-id";
    const name = props.name || "";
    const content = props.content || "";
    const creation_datetime = props.creation_datetime || new Date(Date.now());
    const modification_datetime = props.modification_datetime;
    const sizing = props.sizing || "full-frame";
    const [child_frames, set_child_frames] = useState(props.child_frames || []);
    const style = props.style;

    const handle_click = (e) => {
        e.stopPropagation();
        const parent_element = e.currentTarget.parentElement.closest(".node-frame");
        if (parent_element == null) {
            const child_left = e.pageX - (BASE_WIDTH/2) + "px";
            const child_top = e.pageY  - (BASE_HEIGHT/2) + "px";
            const child_width = BASE_WIDTH + "px";
            const child_height = BASE_HEIGHT + "px";
            const new_child = <NodeFrame
                test_id="child-id"
                sizing="base-frame"
                style={{
                    position: "fixed",
                    width: child_width,
                    height: child_height,
                    left: child_left,
                    top: child_top,
                }}
            />;
            set_child_frames(
                child_frames => {
                    const new_child_frames = [...child_frames];
                    new_child_frames.push(new_child);
                    return new_child_frames;
                });
        }
    }

    return {
        test_id,
        name,
        content,
        creation_datetime,
        modification_datetime,
        sizing,
        child_frames,
        handle_click,
        style,
    };
}
