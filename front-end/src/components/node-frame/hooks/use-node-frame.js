import { useState } from "react";

const BASE_WIDTH = 220;
const BASE_HEIGHT = 80;
const half_base_width = BASE_WIDTH/2;
const half_base_height = BASE_HEIGHT/2;
const PX = "px";

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
        child.is_mouse_down = false;
        return child;
    })

    const handle_creation_click = (e) => {
        let parent = props.parent_props;
        let child_left = "";
        let child_top = "";
        if (e) {
            e.stopPropagation();
            child_left = left_when_middle_is(e.pageX)
            child_top = top_when_middle_is(e.pageY);
        }
        if (parent == null) {
            const child_width = BASE_WIDTH + PX;
            const child_height = BASE_HEIGHT + PX;
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

    const left_when_middle_is = (x) => {
        return x - half_base_width + PX;
    }

    const top_when_middle_is = (y) => {
        return y - half_base_height + PX;
    }

    let is_mouse_down = false;

    const handle_arrangement_mouse_down = () => {
            is_mouse_down = true;
    };

    const handle_arrangement_mouse_move = (e) => {
        if (is_mouse_down === true) {
            const node_frame = e.currentTarget;
            node_frame.style.left = left_when_middle_is(e.pageX)
            node_frame.style.top = top_when_middle_is(e.pageY)
        }
    };

    const handle_arrangement_mouse_up = (e) => {
        is_mouse_down = false;
        const new_style = {...style};
        new_style.left = e.currentTarget.style.left;
        new_style.top = e.currentTarget.style.top;
        const new_child_frames = [...props.parent_props.child_frames];
        new_child_frames.map((child) => {
            if (child.child_number === props.child_number) {
                child.style = new_style;
            }
            return child;
        });
        props.parent_props.set_child_frames(() => {return new_child_frames});
    };

    let handle_click;
    let handle_mouse_down;
    let handle_mouse_move;
    let handle_mouse_up;

    if (mode === "1") {
        handle_click = (e) => {handle_creation_click(e)};
    } else if (mode === "2") {
        handle_click = (e) => {handle_deletion_click(e)};
    } else if (mode === "3") {
        if (props.parent_props != null) {
            handle_mouse_down = (e) => {
                handle_arrangement_mouse_down(e)
            };
            handle_mouse_move = (e) => {
                handle_arrangement_mouse_move(e)
            };
            handle_mouse_up = (e) => {
                handle_arrangement_mouse_up(e)
            };
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
        handle_mouse_down,
        handle_mouse_move,
        handle_mouse_up,
        style,
        parent_props,
        mode,
    };
}
