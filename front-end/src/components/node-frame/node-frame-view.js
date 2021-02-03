import React from "react";
import "./node-frame.sass";
import { DatetimeHelper } from "../../helpers";
import ContentFrameView from "../content-frame";
import {NodeNameView, NodeContentView} from "./";
import Arc from "../arc";

function NodeFrameView(props) {
	const mode = props.get_mode ? props.get_mode() : undefined
	const is_whole = !!props.get_parts;
	const parts = is_whole ? props.get_parts() : undefined;
	let model = {};
	let name_on_input, content_on_input;
	if (props.get_model) {
		const props_model = props.get_model();
		model = {
			name: props_model.get_name(),
			content: props_model.get_content(),
			creation_datetime: props_model.get_creation_datetime(),
			modification_datetime: props_model.get_modification_datetime(),
		}
		if (props.get_name_on_input) {
			name_on_input = props.get_name_on_input();
			content_on_input = props.get_content_on_input();
		}
	}
	const sub_view = parts ? parts.map((part, index) => {

 		if (part.get_arcs().length > 0) {
			const arcs = part.get_arcs().filter((arc) => arc.get_sense().get_id() !== Arc.HAVE_PART.get_id());
			const arc_pieces = arcs.map((arc, index2) => {
				const arc_sink = arc.get_sink();
				const arc_sense = arc.get_sense();
				const has_sink = parts.some(p => p.get_id() === arc_sink.get_id());
				const has_sense = parts.some(p => p.get_id() === arc_sense.get_id());
				let left_arc_line, right_arc_line;
				if (has_sense) {
					const arc_framed = props.get_part(arc_sense.get_id());
					const left_line_props = Arc.arc_line({left_frame: part, right_frame: arc_framed});
					left_arc_line = <div data-testid={arc.get_left_id()} {...left_line_props} />
					if (has_sink) {
						const sink = props.get_part(arc_sink.get_id());
						const right_line_props = Arc.arc_line({left_frame: arc_framed, right_frame: sink});
						right_arc_line = <div data-testid={arc.get_right_id()} {...right_line_props} />
					}
				}
				return left_arc_line || right_arc_line ? (
					<React.Fragment key={index2} >
						{left_arc_line}
						{right_arc_line}
					</React.Fragment>
				) : undefined;
			});

			return (<React.Fragment key={index}>
					<ContentFrameView key={part.get_id()} {...part} />
					{arc_pieces.map((arc) => arc)}
				</React.Fragment>
			);
		} else {
			return <ContentFrameView key={part.get_id()} {...part} />
		}
	}) : undefined

	return (<div data-testid={props.test_id}>
	      <div className="node-frame-header">
			  <NodeNameView {...{model, mode, name_on_input}} />
	      </div>
		  <NodeContentView {...{model, mode, content_on_input}} />
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