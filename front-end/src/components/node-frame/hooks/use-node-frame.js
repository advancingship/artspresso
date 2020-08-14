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
    const [children, set_children] = useState(props.children || []);
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
            set_children(
                children => {
                    const new_children = [...children];
                    new_children.push(new_child);
                    return new_children;
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
        children,
        handle_click,
        style,
    };
}
