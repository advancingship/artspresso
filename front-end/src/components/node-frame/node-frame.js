import React from "react";
import "./node-frame.sass";
import Form from "react-bootstrap/Form"
import { DatetimeHelper } from "../../helpers";

function useNodeFrame(props) {
    const test_id = props.test_id;
    const name = props.name || "";
    const content = props.content || "";
    const creation_datetime = props.creation_datetime || new Date(Date.now());
    const modification_datetime = props.modification_datetime;
    const sizing = props.sizing || "full-frame";
    const on_click = props.on_click;

    return [
	test_id,
	name,
	content,
	creation_datetime,
	modification_datetime,
	sizing,
	on_click
    ]	
}

function NodeFrame(props) {
    const [test_id, name, content, creation_datetime, modification_datetime, sizing, on_click] = useNodeFrame(props);

	return (
		<div role="document" data-testid={test_id} className={"node-frame " + sizing} onClick={on_click}>
	      <div className="node-frame-header">
	        <Form.Group controlId="node-frame-form.control-name">
   	        <Form.Control type="text" aria-label="name"
	          placeholder="optional name" defaultValue={name} />
	        </Form.Group>
		<div className="timestamps">
		  <h4 className="creation-datetime"
	            aria-label="creation-datetime">
		          {DatetimeHelper.app_datetime_string(
			      creation_datetime
			  )}
                  </h4>
  		  <h4 className="modification-datetime"
	            aria-label="modification-datetime"> 
		      {DatetimeHelper.app_datetime_string(
		          modification_datetime
		      )}
	          </h4>
	        </div>
	      </div>
	      <Form.Group controlId="node-frame-form.control-textarea">
		<Form.Control as="textarea" aria-label="content" cols="72"
	          rows="3" placeholder="optional content" defaultValue={content} />
		</Form.Group>
	    </div>
	);
}

export default NodeFrame;
