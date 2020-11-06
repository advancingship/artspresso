import React from "react";
import {App} from "../app";

function NodeContentView(props) {
    let model = {};
    let mode, content_on_input;
    if (props.model) {
        model = props.model;
        mode = props.mode;
        content_on_input = props.content_on_input;
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
                      onChange={(event) => content_on_input({value: event.target.value})}
            />
        </div>
    );
}

export default NodeContentView;
