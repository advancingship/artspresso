import React from "react";

function ContentFrameView(props) {
    const content_frame = props;
    const className = content_frame.get_class_name();
    const is_jetter = !!content_frame.get_position;
    const attributes = {
        id: content_frame.get_id(),
        className,
        onClick: content_frame.get_on_click(),
        onMouseUp: content_frame.get_on_mouse_up(),
        onMouseDown: content_frame.get_on_mouse_down(),
        onMouseMove: content_frame.get_on_mouse_move(),
    }
    if (is_jetter) {
        attributes.style = {
            position: content_frame.get_position(),
                left: content_frame.get_left(),
                top: content_frame.get_top(),
                width: content_frame.get_width(),
                height: content_frame.get_height(),
        }
    }

    const content = React.createElement(content_frame.get_model().get_model_view(), props);

    return (
        <div role='document' {...attributes} >
            {content}
        </div>
    );
}

export default ContentFrameView;
