import React, { useState } from "react";
import "./node-frame.sass";
import Form from "react-bootstrap/Form"
import { DatetimeHelper } from "../../helpers";

function useNodeFrame(props) {
    const test_id = props.test_id || "node-frame-test-id";
    const name = props.name || "";
    const content = props.content || "";
    const creation_datetime = props.creation_datetime || new Date(Date.now());
    const modification_datetime = props.modification_datetime;
    const sizing = props.sizing || "full-frame";
    const [children, setChildren] = useState(props.children || []);

    return [
		test_id,
		name,
		content,
		creation_datetime,
		modification_datetime,
		sizing,
		children,
		setChildren
	];
}

function add_child(children) {
    const new_child = <NodeFrame test_id="child-id" sizing="base-frame" />;
    const new_children = [...children];
    new_children.push(new_child);
    return new_children;
}
    
function NodeFrame(props) {
    const [test_id, name, content, creation_datetime, modification_datetime, sizing, children, setChildren]
		= useNodeFrame(props);

    const on_click = (e) => {
		e.stopPropagation();
		const hasNoParent = (null == e.target.parentElement.closest(".node-frame"));
		if (hasNoParent) {
			setChildren(children => add_child(children));
		}
    };
    
    return (
	    <div role="document" data-testid={test_id}
	         className={"node-frame " + sizing} onClick={on_click}>
	      <div className="node-frame-header">
	        <Form.Group controlId="node-frame-form.control-name">
				<Form.Control className="node-frame-name" type="text"
							  aria-label="name"
							  placeholder="optional name" defaultValue={name}
							  autoFocus
							  onClick={(e) => {
								  e.preventDefault();
								  e.stopPropagation();
							  }}/>
	        </Form.Group>
	      </div>
	      <Form.Group controlId="node-frame-form.control-textarea">
		    <Form.Control className="node-frame-content" as="textarea"
						  aria-label="content"
						  placeholder="optional content"
	                      defaultValue={content}
	                      onClick={(e) => {
	                        e.preventDefault();
	                        e.stopPropagation();
	                      }} />
	      </Form.Group>
			<div className="node-frame-body">
	      {children.map((element, index) => {
		    return <div key={index}>{element}</div>
	      })}
			</div>
	      <div className="node-frame-footer">
			  <div className="timestamps">
				  <div data-testid={"creation-datetime-"+test_id}
					   className="creation-datetime"
					  aria-label="creation-datetime">
					  {DatetimeHelper.app_datetime_string(
						  creation_datetime
					  )}
				  </div>
				  <div data-testid={"modification-datetime-"+test_id}
					   className="modification-datetime"
					  aria-label="modification-datetime">
					  {DatetimeHelper.app_datetime_string(
						  modification_datetime
					  )}
				  </div>
			  </div>
		  </div>
	    </div>
	);
}

export default NodeFrame;
