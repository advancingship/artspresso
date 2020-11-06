import React from "react";
import {render, screen} from "@testing-library/react"
import {NodeNameView} from "./";

describe("<NodeNameView/> Component", () => {

    describe("given no props", () => {
        beforeEach(() => {
            render(<NodeNameView/>);
        });

        it("renders a name field", () => {
            const name_field = screen.getByRole("textbox", {name: /name/i});
            expect(name_field).toBeInTheDocument();
        });
    });


    describe("given props", () => {
        let model = {}
        let name = "test name";
        model.name = name;
        beforeEach(() => {
            render(<NodeNameView {...{model}} />);
        });

        it("displays the name from props", () => {
            const name_field = screen.getByRole("textbox", {name: /name/i});
            expect(name_field).toHaveDisplayValue(name);
        });
    });
});
