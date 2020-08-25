import React from "react";
import {render, screen, getNodeText, fireEvent} from "@testing-library/react"
import NodeFrame from "./";
import { DatetimeHelper } from "../../helpers";
import { MouseEventHelper } from "../../helpers";
import * as hooks from "./hooks";
jest.mock("./hooks", () => ({
	...jest.requireActual("./hooks")
}))

describe("<NodeFrame/> Component", () => {

    describe("given no props", () => {

		beforeEach(() => {
			render(<NodeFrame />);
		});

		it("renders a generic test id", () => {
			const node_frame = screen.getByRole("document")
			expect(node_frame).toHaveAttribute("data-testid"
				,expect.stringContaining("node-frame-test-id"));
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
	
		it("renders a creation datetime", () => {
			const creation_datetime_tag = screen.getByTestId("creation-datetime-node-frame-test-id");
			expect(creation_datetime_tag).toBeInTheDocument();
		});
	
		it("renders the creation datetime from when it was rendered", () => {
			const creation_datetime_tag = screen.getByTestId("creation-datetime-node-frame-test-id");
			const creation_datetime_text = getNodeText(creation_datetime_tag);
			const creation_datetime = DatetimeHelper
				.app_datetime_milliseconds(creation_datetime_text);
			const current_datetime = Date.now();
			expect((current_datetime - creation_datetime) < 1000);
		});
	
		it("renders a modification datetime", () => {
			const modification_datetime_tag = screen.getByTestId("modification-datetime-node-frame-test-id");
			expect(modification_datetime_tag).toBeInTheDocument();
		});
	
		it("renders the modification datetime as dashed-out", () => {
			const modification_datetime_tag = screen.getByTestId("modification-datetime-node-frame-test-id");
			const dashed_time = "-------- --:--:--:---"
			expect(modification_datetime_tag).toHaveTextContent(
				dashed_time
			);
		});

		it("renders with a className for full sizing", () => {
			const node_frame = screen.getByRole("document");
			expect(node_frame).toHaveClass("full-frame");
		});

		it("renders no child_frames", () => {
			const node_frames = screen.getAllByRole("document");
			expect(node_frames).toHaveLength(1);
		});
	});

	describe("given main props", () => {

		const now = Date.now()
		const create_time = new Date(now);
		const modify_time = new Date(now + 1234567);
		const test_id = "test-id";
		const name = "test-name";
		const content = "test-content";
		const sizing = "base-frame";

		beforeEach(() => {
			render(<NodeFrame
				test_id={test_id}
				name={name}
				content={content}
				creation_datetime={create_time}
				modification_datetime={modify_time}
				sizing={sizing}
			/>);
		});

		it("renders a test id", () => {
			const node_frame  = screen.getByTestId(test_id);
			expect(node_frame).toBeInTheDocument();
			//confirm that the "renders no test id" test could fail
			expect(node_frame).toHaveAttribute("data-testid");
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

		it("displays the content from props", () => {
			const content_field = screen.getByRole("textbox",
				{name: /content/i}
			);
			expect(content_field).toHaveDisplayValue(content);
		});

		it("renders a creation datetime", () => {
			const creation_datetime_tag = screen.getByTestId("creation-datetime-" + test_id);
			expect(creation_datetime_tag).toBeInTheDocument();
		});

		it("renders the creation datetime from props", () => {
			const creation_datetime_tag = screen.getByTestId("creation-datetime-" + test_id);
			const expected_create_time_text = DatetimeHelper
				.app_datetime_string(create_time);
			expect(creation_datetime_tag).toHaveTextContent(
				expected_create_time_text
			);
		});

		it("renders a modification datetime", () => {
			const modification_datetime_tag = screen.getByTestId("modification-datetime-" + test_id);
			expect(modification_datetime_tag).toBeInTheDocument();
		});

		it("renders the modification datetime from props", () => {
			const modification_datetime_tag = screen.getByTestId("modification-datetime-" + test_id);
			const expected_modify_time_text = DatetimeHelper
				.app_datetime_string(modify_time);
			expect(modification_datetime_tag).toHaveTextContent(
				expected_modify_time_text
			);
		});

		it("renders with a className from the 'sizing' prop", () => {
			const base_node_frame = screen.getByTestId(test_id);
			expect(base_node_frame).toHaveClass("base-frame");
		});
	});

	describe("given a child_frames property containing a NodeFrame", () => {

		it("renders a child in its bounds", () => {
			const expect_child = {test_id: "child-id"};
			render(<NodeFrame test_id="parent-id" child_frames={[expect_child]} />);
			const parent = screen.getByTestId("parent-id");
			const child = screen.getByTestId("child-id");
			expect(parent).toContainElement(child);
		});
	});

	describe("when NodeFrame is clicked", () => {

		describe("when create mode is passed", () => {

			describe("when NodeFrame has no parent NodeFrame", () => {

				it( "it calls handle_click and gets a new child_frame", () => {
					const use_node_frame_spy = jest.spyOn(hooks, "useNodeFrame");
					const click_handler = jest.fn();
					//first it renders the parent and in that render must render the child
					use_node_frame_spy.mockReturnValueOnce({
						handle_click: click_handler,
						test_id: "parent-id",
						child_frames: [{}]
					}).mockReturnValueOnce({
						test_id: "child-id",
						child_frames: []
					});
					render(<NodeFrame mode="1" />);
					const parent = screen.getByTestId("parent-id");
					fireEvent.click(parent);
					expect(click_handler).toBeCalledTimes(1);
					const child = screen.getByTestId("child-id");
					expect(parent).toContainElement(child);
				});

				it( "appears where the user clicked", () => {
					const expect_child = {test_id: "expected-child-id"};
					const on_mouse_up = jest.fn();
					render(<NodeFrame test_id="parent-id" onMouseUp={on_mouse_up}
									  mode="1"
									  child_frames={[expect_child]} />);
					const parent = screen.getByTestId("parent-id");
					const x = 250;
					const y = 251;
					const width = 220; //NodeFrame.BASE_WIDTH
					const height = 80; //NodeFrame.BASE_HEIGHT
					const event_values = {bubbles: true, pageX: x, pageY: y};
					const mouse_click= MouseEventHelper.get_fake_mouse_event('click', event_values);
					fireEvent(parent, mouse_click);
					const new_child = screen.getByTestId("child-id");
					expect(parent).toContainElement(new_child);
					expect(new_child.style.left).toEqual(x - (width/2) + "px");
					expect(new_child.style.top).toEqual(y - (height/2) + "px");
				});
			});
			describe("when NodeFrame has a parent NodeFrame", () => {
				it("does not get a new child NodeFrame", () => {
					const parent_props = {};
					const child_props = {test_id: "child-test-id",
						mode: "1",
						parent_props: parent_props
					};
					render(<NodeFrame {...child_props} />);
					const child = screen.getByTestId("child-test-id");
					fireEvent.click(child)
					const node_frames = screen.getAllByRole("document")
					expect(node_frames).toHaveLength(1);
				});
			});
		});
	});
});
