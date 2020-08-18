import { useState } from "react";

const BASE_WIDTH = "220";
const BASE_HEIGHT = "80";

export default function useNodeFrame(props = {}) {
    const test_id = props.test_id || "node-frame-test-id";
    const name = props.name || "";
    const content = props.content || "";
    const creation_datetime = props.creation_datetime || new Date(Date.now());
    const modification_datetime = props.modification_datetime;
    const sizing = props.sizing || "full-frame";
    const [child_frames, set_child_frames] = useState(props.child_frames || []);
    const style = props.style;
    const parent_props = props.parent_props;
    const mode = props.mode;

    child_frames.map((child, index) => {
        child.parent_props = {
            ...props,
            child_frames: child_frames,
            set_child_frames: set_child_frames,
        };
        child.mode = props.mode;
        child.child_number = index;
        return child;
    })

    const handle_creation_click = (e) => {
        let parent = props.parent_props;
        let child_left = "";
        let child_top = "";
        if (e) {
            e.stopPropagation();
            child_left = e.pageX - (BASE_WIDTH/2) + "px";
            child_top = e.pageY  - (BASE_HEIGHT/2) + "px";
        }
        if (parent == null) {
            const child_width = BASE_WIDTH + "px";
            const child_height = BASE_HEIGHT + "px";
            const new_child = {
                test_id: "child-id",
                sizing: "base-frame",
                style: {
                    position: "fixed",
                    width: child_width,
                    height: child_height,
                    left: child_left,
                    top: child_top,
                },
            };
            set_child_frames(
                child_frames => {
                    const new_child_frames = [...child_frames];
                    new_child_frames.push(new_child);
                    return new_child_frames;
                });
        }
    };

    const handle_deletion_click = () => {
        if (props.parent_props != null) {
            const new_child_frames = props.parent_props.child_frames.filter(
                (child) => {
                    return child.child_number !== props.child_number
                }
            );
            props.parent_props.set_child_frames(() => {return new_child_frames});
        }
    };

    let handle_click = null;
    if (mode === "1") {
        handle_click = handle_creation_click;
    } else if (mode === "2") {
        handle_click = handle_deletion_click;
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
        parent_props,
        mode,
    };
}
