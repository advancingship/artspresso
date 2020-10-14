import React from "react";
import {render, screen} from "@testing-library/react"
import NodeFrameView, {NodeFrame} from "./";
import { DatetimeHelper } from "../../helpers";

describe("<NodeFrameView/> Component", () => {

    describe("given no props", () => {
		beforeEach(() => {
			render(<NodeFrameView />);
		});
		it("renders a name field", () => {
			const name_field = screen.getByRole("textbox", {name: /name/i});
			expect(name_field).toBeInTheDocument();
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
});
