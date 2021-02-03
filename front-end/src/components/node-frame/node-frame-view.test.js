import React from "react";
import {render, screen} from "@testing-library/react"
import NodeFrameView, {DefaultNodeFrame, NodeFrame} from "./";
import {DatetimeHelper} from "../../helpers";
import Arc from "../arc";
import ContentFrameView, {BaseFrame, FullFrame} from "../../components/content-frame";

describe("<NodeFrameView/> Component", () => {

    describe("given no props", () => {
		beforeEach(() => {
			render(<NodeFrameView />);
		});
		it("displays the name placeholder by having empty value", () => {
			const name_field = screen.getByRole("textbox", {name: /name/i});
			expect(name_field).toHaveDisplayValue("");
		});
		it("renders a content field", () => {
			const content_field = screen.getByRole("textbox",
				{name: /content/i}
			);
			expect(content_field).toBeInTheDocument();
		});
		it("displays the content placeholder by having empty value", () => {
			const content_field = screen.getByRole("textbox",
				{name: /content/i}
			);
			expect(content_field).toHaveDisplayValue("");
		});
	});

	describe("pass a test id and a content-frame bearing a model", () => {
		const now = Date.now()
		const create_time = new Date(now);
		const modify_time = new Date(now + 1234567);
		const test_id = "test-id";
		const name = "test-name";
		const content = "test-content";
		beforeEach(() => {
			render(<NodeFrameView {...{
				test_id: test_id,
				get_model: () => {
					return NodeFrame.brew({
						terms: {
							name: name,
							content: content,
							creation_datetime: create_time,
							modification_datetime: modify_time,
						}
					}); }
			}} />);
		});
		it("renders a name field", () => {
			const name_field = screen.getByRole("textbox", {name: /name/i});
			expect(name_field).toBeInTheDocument();
		});

 		it("displays the name from props", () => {
			const name_field = screen.getByRole("textbox", {name: /name/i});
			expect(name_field).toHaveDisplayValue(name);
		});

		it("renders a content field", () => {
			const content_field = screen.getByRole("textbox",
				{name: /content/i}
			);
			expect(content_field).toBeInTheDocument();
		});

		it("displays the content from the model", () => {
			const content_field = screen.getByRole("textbox",
				{name: /content/i}
			);
			expect(content_field).toHaveDisplayValue(content);
		});

		it("renders a creation datetime element", () => {
			const creation_datetime_tag = screen.getByTestId("creation-datetime-" + test_id);
			expect(creation_datetime_tag).toBeInTheDocument();
		});

		it("renders the creation datetime from the model", () => {
			const creation_datetime_tag = screen.getByTestId("creation-datetime-" + test_id);
			const expected_create_time_text = DatetimeHelper
				.app_datetime_string(create_time);
			expect(creation_datetime_tag).toHaveTextContent(
				expected_create_time_text
			);
		});

		it("renders a modification datetime element", () => {
			const modification_datetime_tag = screen.getByTestId("modification-datetime-" + test_id);
			expect(modification_datetime_tag).toBeInTheDocument();
		});

		it("renders the modification datetime from the model", () => {
			const modification_datetime_tag = screen.getByTestId("modification-datetime-" + test_id);
			const expected_modify_time_text = DatetimeHelper
				.app_datetime_string(modify_time);
			expect(modification_datetime_tag).toHaveTextContent(
				expected_modify_time_text
			);
		});
	});
	describe("pass a content-frame bearing nodes connected by an arc", () => {
		let node_a, node_b, sense_ab, arc_ab, part_arc_a, part_arc_b, part_arc_sense_ab, full_node;
		function wait() {console.log("stalling to keep date-based id's unique (needed in automated creation")}
		beforeEach(() => {
			node_b = BaseFrame.brew({
				model: DefaultNodeFrame.brew(),
				left: 101, top: 153,
			});
			wait();
			sense_ab = BaseFrame.brew({
				model: DefaultNodeFrame.brew(),
				left: 161, top: 123,
			});
			wait();
			arc_ab = Arc.brew({terms: {sense: sense_ab, sink: node_b}});
			node_a = BaseFrame.brew({
				model: DefaultNodeFrame.brew(),
				left: 191, top: 133,
				arcs: [arc_ab],
			});
			part_arc_a = Arc.brew({terms: {sense: Arc.HAVE_PART, sink: node_a}});
			part_arc_b = Arc.brew({terms: {sense: Arc.HAVE_PART, sink: node_b}});
			part_arc_sense_ab = Arc.brew({terms: {sense: Arc.HAVE_PART, sink: sense_ab}});
		});

		describe("where arc has sense and sink", () => {
		    beforeEach(()=> {
				full_node = FullFrame.brew({
					model: DefaultNodeFrame.brew(),
					arcs: [part_arc_a, part_arc_b, part_arc_sense_ab],
				});
				render(<ContentFrameView {...full_node} />);
			});

			it("renders left and right arc lines", () => {
				const arc_line_a_left = screen.getByTestId(arc_ab.get_left_id());
				const arc_line_a_right = screen.getByTestId(arc_ab.get_right_id());
				expect(arc_line_a_left).toBeInTheDocument()
				expect(arc_line_a_right).toBeInTheDocument();
			});
		});
		describe("where the full frame does not have the arc sink node", () => {
			beforeEach(() => {
				full_node = FullFrame.brew({
					model: DefaultNodeFrame.brew(),
					arcs: [part_arc_a, part_arc_sense_ab],
				});
				render(<ContentFrameView {...full_node} />);
			});
			it("renders a left arc line", () => {
				const arc_line_a_left = screen.getByTestId(arc_ab.get_left_id());
				const arc_line_a_right = screen.queryByTestId(arc_ab.get_right_id());
				expect(arc_line_a_left).toBeInTheDocument()
				expect(arc_line_a_right).not.toBeInTheDocument();
			});
		});
		describe("where the full frame does not have the arc sense node", () => {
			beforeEach(() => {
				full_node = FullFrame.brew({
					model: DefaultNodeFrame.brew(),
					arcs: [part_arc_a, part_arc_b],
				});
				render(<ContentFrameView {...full_node} />);
			});
			it("renders no arc line", () => {
				const arc_line_a_left = screen.queryByTestId(arc_ab.get_left_id());
				const arc_line_a_right = screen.queryByTestId(arc_ab.get_right_id());
				expect(arc_line_a_left).not.toBeInTheDocument()
				expect(arc_line_a_right).not.toBeInTheDocument();
			});
		});
	});
});
