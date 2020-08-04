import React from "react";
import {render, screen, getNodeText, fireEvent} from "@testing-library/react"
import NodeFrame from "./";
import { DatetimeHelper } from "../../helpers";

describe("<NodeFrame/> Component", () => {

    describe("given no props", () => {

	beforeEach(() => {
	    render(<NodeFrame />);
	});

	it("renders no test id", () => {
	    const node_frame = screen.getByRole("document")
	    expect(node_frame).not.toHaveAttribute("data-testid");
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
	    const creation_datetime_tag = screen.getByRole(
		"heading", {name: /creation-datetime/}
	    );
	    expect(creation_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the creation datetime from when it was rendered", () => {
	    const creation_datetime_tag = screen.getByRole(
		"heading", {name: /creation-datetime/}
	    );
	    const creation_datetime_text = getNodeText(creation_datetime_tag);
	    const creation_datetime = DatetimeHelper
		  .app_datetime_milliseconds(creation_datetime_text);
	    const current_datetime = Date.now();
	    expect((current_datetime - creation_datetime) < 1000);
	});
	
	it("renders a modification datetime", () => {
	    const modification_datetime_tag = screen.getByRole(
		"heading", {name: /modification-datetime/}
	    );
	    expect(modification_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the modification datetime as dashed-out", () => {
	    const modification_datetime_tag = screen.getByRole(
		"heading", {name: /modification-datetime/}
	    );
	    const dashed_time = "-------- --:--:--:---"
	    expect(modification_datetime_tag).toHaveTextContent(
		dashed_time
	    );
	});

	it("renders with a className for full sizing", () => {
	    const node_frame = screen.getByRole("document");
	    expect(node_frame).toHaveClass("full-frame");
	});

	it("renders no children", () => {
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
			       modification_datetime={modify_time}			        	       sizing={sizing}
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
	    const creation_datetime_tag = screen.getByRole(
		"heading", {name: /creation-datetime/}
	    );
	    expect(creation_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the creation datetime from props", () => {
	    const creation_datetime_tag = screen.getByRole(
		"heading", {name: /creation-datetime/}
	    );
	    const expected_create_time_text = DatetimeHelper
		  .app_datetime_string(create_time);
	    expect(creation_datetime_tag).toHaveTextContent(
		expected_create_time_text
	    );
	});
	
	it("renders a modification datetime", () => {
	    const modification_datetime_tag = screen.getByRole(
		"heading", {name: /modification-datetime/}
	    );
	    expect(modification_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the modification datetime from props", () => {
	    const modification_datetime_tag = screen.getByRole(
		"heading", {name: /modification-datetime/}
	    );
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
    
    describe("given a children property containing a NodeFrame", () => {
	
	it("renders a child in its bounds", () => {
	    const expect_child = <NodeFrame test_id="child-id" />;
	    render(<NodeFrame test_id="parent-id" children={[expect_child]} />);
	    const parent = screen.getByTestId("parent-id");
	    const child = screen.getByTestId("child-id");
	    expect(parent).toContainElement(child);
	});
    });

    describe("when NodeFrame is clicked", () => {
	it ("gets a new child NodeFrame", () => {
	    render(<NodeFrame test_id="test-id" />);
	    const test_node = screen.getByTestId("test-id");
	    fireEvent.click(test_node)
	    const node_frames = screen.getAllByRole("document")
	    expect(node_frames).toHaveLength(2);
	});
    });
});

    
