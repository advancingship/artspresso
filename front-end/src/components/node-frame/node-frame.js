import React, { useState } from "react";
import "./node-frame.sass";
import Form from "react-bootstrap/Form"
import { DatetimeHelper } from "../../helpers";

const BASE_WIDTH = "220";
const BASE_HEIGHT = "80";

function useNodeFrame(props) {
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

	return [
		test_id,
		name,
		content,
		creation_datetime,
		modification_datetime,
		sizing,
		children,
		handle_click,
		style,
	];
}

function NodeFrame(props) {
    const [test_id, name, content, creation_datetime, modification_datetime
	   , sizing, children, handle_click, style]
	  = useNodeFrame(props);

    return (
	    <div role="document" data-testid={test_id}
	         className={"node-frame " + sizing} onClick={handle_click}
	         style={style}>
	      <div className="node-frame-header">
	        <Form.Group controlId="node-frame-form.control-name">
	          <Form.Control className="node-frame-name"
	                        type="text"  aria-label="name"
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
