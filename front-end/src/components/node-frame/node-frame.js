import React from "react";
import * as hooks from "./hooks";
import "./node-frame.sass";
import Form from "react-bootstrap/Form"
import { DatetimeHelper } from "../../helpers";

function NodeFrame(props) {
    const {test_id, name, content, creation_datetime, modification_datetime
	   , sizing, child_frames, handle_click, style} = hooks.useNodeFrame(props);

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
			  {child_frames.map((element, index) => {
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
