import React from "react";
import * as hooks from "./hooks";
import "./node-frame.sass";
import { DatetimeHelper } from "../../helpers";

function NodeFrame(props) {
    const {test_id, name, content, creation_datetime, modification_datetime
	   , sizing, child_frames, handle_click, handle_mouse_down, handle_mouse_move
		, handle_mouse_up, style, mode} = hooks.useNodeFrame(props);

    return (
	    <div id={props.id} role="document" data-testid={test_id}
	         className={"node-frame " + sizing}
			 onClick={handle_click}
			 onMouseDown={handle_mouse_down}
			 onMouseMove={handle_mouse_move}
			 onMouseUp={handle_mouse_up}
	         style={style}>
	      <div className="node-frame-header">
	        <div className="node-frame-form.control-name input-control">
	          <input className="node-frame-name input-control"
	                        type="text"  aria-label="name"
	                        placeholder="optional name" defaultValue={name}
							autoFocus
							onClick={(e) => {
								e.preventDefault();
								if (mode === "1") {
									e.stopPropagation();
								}
							}}/>
	        </div>
	      </div>
	      <div className="node-frame-form.control-textarea input-control">
		    <textarea className="node-frame-content input-control"
						  aria-label="content"
						  placeholder="optional content"
	                      defaultValue={content}
	                      onClick={(e) => {
	                        e.preventDefault();
	                        if (mode === "1") {
								e.stopPropagation();
							}
	                      }} />
	      </div>
		  <div className="node-frame-body">
			  {child_frames.map((child_frame_props, index) => {
				  child_frame_props.key = index;
				  child_frame_props.id = index;
				  return <NodeFrame {...child_frame_props} />
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
