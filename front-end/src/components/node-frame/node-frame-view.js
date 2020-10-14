import React from "react";
import "./node-frame.sass";
import { DatetimeHelper } from "../../helpers";
import ContentFrameView from "../content-frame";

function NodeFrameView(props) {
	const mode = props.get_mode ? props.get_mode() : undefined
	const is_whole = !!props.get_parts;
	const parts = is_whole ? props.get_parts() : undefined;
	let model = {};
	if (props.get_model) {
		const props_model = props.get_model();
		model = {
			name: props_model.get_name(),
			content: props_model.get_content(),
			creation_datetime: props_model.get_creation_datetime(),
			modification_datetime: props_model.get_modification_datetime(),
		}
	}
	const sub_view = parts ? parts.map(part => {
		return <ContentFrameView {...part} />
	}) : undefined

	return (<div data-testid={props.test_id}>
	      <div className="node-frame-header">
	        <div className="node-frame-form.control-name input-control">
	          <input className="node-frame-name input-control"
	                        type="text"  aria-label="name"
	                        placeholder="optional name" defaultValue={model.name}
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
					      defaultValue={model.content}
	                      onClick={(e) => {
	                        e.preventDefault();
	                        if (mode === "1") {
								e.stopPropagation();
							}
	                      }} />
	      </div>
		  <div className="node-frame-body">
			  {sub_view}
		  </div>
	      <div className="node-frame-footer">
			  <div className="timestamps">
	            <div data-testid={"creation-datetime-"+props.test_id}
			         className="creation-datetime"
			         aria-label="creation-datetime">
			      {DatetimeHelper.app_datetime_string(
			      	model.creation_datetime ? new Date(model.creation_datetime) : undefined )}
			    </div>
				<div data-testid={"modification-datetime-"+props.test_id}
					 className="modification-datetime"
					 aria-label="modification-datetime">
				  {DatetimeHelper.app_datetime_string(
				  	model.modification_datetime ? new Date(model.modification_datetime) : undefined)}
				</div>
			  </div>
		  </div>
		</div>
	);
}

export default NodeFrameView;