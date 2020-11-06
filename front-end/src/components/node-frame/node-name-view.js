import React from "react";
import {App} from "../app";

function NodeNameView(props) {
    let model = {};
    let mode, name_on_input;
    let model_name = "";
    if (props.model) {
        model = props.model;
        mode = props.mode;
        name_on_input = props.name_on_input;
        model_name = model.name ? model.name : model_name;
    }
    return (<div className="node-frame-form.control-name input-control">
            <input className="node-frame-name input-control"
                   type="text"  aria-label="name"
                   placeholder="optional name"
                   value={model_name}
                   autoFocus
                   onClick={(e) => {
                       e.preventDefault();
                       if (mode === App.PIN_MODE) {
                           e.stopPropagation();
                       }
                   }}
                   onChange={(event) => name_on_input({value: event.target.value})}
            />
        </div>
    );
}

export default NodeNameView;