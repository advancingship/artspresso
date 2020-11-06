import React from "react";
import {render, screen} from "@testing-library/react"
import {NodeContentView} from "./";

describe("<NodeContentView/> Component", () => {

    describe("given no props", () => {
        beforeEach(() => {
            render(<NodeContentView/>);
        });

        it("renders a content field", () => {
            const content_field = screen.getByRole("textbox", {content: /content/i});
            expect(content_field).toBeInTheDocument();
        });
    });


    describe("given props", () => {
        let model = {}
        let content = "test content";
        model.content = content;
        beforeEach(() => {
            render(<NodeContentView {...{model}} />);
        });

        it("displays the content from props", () => {
            const content_field = screen.getByRole("textbox", {content: /content/i});
            expect(content_field).toHaveDisplayValue(content);
        });
    });
});
