import React from "react";
import {App} from "../app";
import {useDebouncedCallback} from "use-debounce"

function NodeContentView(props) {
    let model = {};
    let mode, content_on_input;
    if (props.model) {
        model = props.model;
        mode = props.mode;
        content_on_input = props.content_on_input;
    }
    const debounced_set_content = useDebouncedCallback(
        value => content_on_input({value, should_call_api: true}),10000
    );

    function content_now_and_later(value) {
        content_on_input({value})
        debounced_set_content.callback(value);
    }

    return (<div className="node-frame-form.control-textarea input-control">
		    <textarea className="node-frame-content input-control"
                      aria-label="content"
                      placeholder="optional content"
                      value={model.content}
                      onClick={(e) => {
                          e.preventDefault();
                          if (mode ===App.PIN_MODE) {
                              e.stopPropagation();
                          }
                      }}
                      onChange={event => content_now_and_later(event.target.value)}
            />
        </div>
    );
}

export default NodeContentView;
