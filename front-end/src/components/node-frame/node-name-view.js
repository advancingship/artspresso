import React from "react";
import {App} from "../app";
import {useDebouncedCallback} from "use-debounce"

function NodeNameView(props) {
    let model = {};
    let mode, name_on_input;
    let ident = "ident";
    let model_name = "";
    if (props.model) {
        model = props.model;
        mode = props.mode;
        name_on_input = props.name_on_input;
        model_name = model.name ? model.name : model_name;
        ident = model.identity
    }

    const debounced_set_name = useDebouncedCallback(
        value => name_on_input({value, should_call_api: true}),10000
    );

    function name_now_and_later(value) {
        name_on_input({value})
        debounced_set_name.callback(value);
    }


    return (<div className="node-frame-form.control-name input-control">
            <input className="node-frame-name input-control"
                   id={ident}
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
                   onChange={event => name_now_and_later(event.target.value)}
            />
        </div>
    );
}

export default NodeNameView;