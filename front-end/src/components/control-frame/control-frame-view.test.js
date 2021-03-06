import React from "react";
import {render, screen, fireEvent} from "@testing-library/react"
import ControlFrame from "./";
import {App} from "../app";

describe("<ControlFrameView/> Component", () => {

    const mode_names = App.MODE_NAMES;
    const set_mode = jest.fn();

    describe("pass create-mode, mode_names and set-mode", () => {
        beforeEach(() => {
            render(<ControlFrame mode_names={mode_names} mode={App.PIN_MODE} set_mode={set_mode}/>);
        });
        it("renders a group", () => {
            const button_group = screen.getByRole("radiogroup", {name: /controls/i});
            expect( button_group ).toBeInTheDocument();
        });
        it("renders a create button in the group", () => {
            const button_group = screen.getByRole("radiogroup", {name: /controls/i});
            const create_button = screen.getByRole("radio", {name: /create/i});
            expect( button_group ).toContainElement(create_button);
        });
        it("renders a delete button in the group", () => {
            const button_group = screen.getByRole("radiogroup", {name: /controls/i});
            const delete_button = screen.getByRole("radio", {name: /delete/i});
            expect( button_group ).toContainElement(delete_button);
        });
        it( "renders an arrange button in the group", () => {
            const arrange_button = screen.getByRole("radio", {name: /arrange/i});
            expect(arrange_button).toBeInTheDocument();
        })
        it( "has checked the create button", () => {
            const create_button = screen.getByRole("radio", {name: /create/i});
            expect( create_button ).toBeChecked();
        });
        it( "has not checked the delete button", () => {
            const delete_button = screen.getByRole("radio", {name: /delete/i});
            expect( delete_button ).not.toBeChecked();
        });
    });


    describe("when the create button is checked", function () {
        beforeEach(() => {
            render(<ControlFrame mode_names={mode_names} mode={App.PLUCK} set_mode={set_mode}/>);
        });
        it( "checks the button", () => {
            const create_button = screen.getByRole("radio", {name: /create/i});
            fireEvent.click(create_button);
            expect(create_button).toBeChecked();
        });
        it( "sets the mode to create", () => {
            const create_button = screen.getByRole("radio", {name: /create/i});
            fireEvent.click(create_button);
            expect(set_mode).toBeCalledWith("" + App.PIN_MODE);
        });
    });

    describe("when the delete button is checked", function () {
        const set_mode = jest.fn();
        beforeEach(() => {
            render(<ControlFrame mode_names={mode_names} mode={App.PIN_MODE} set_mode={set_mode}/>);
        });
        it( "checks the button", () => {
            const delete_button = screen.getByRole("radio", {name: /delete/i});
            fireEvent.click(delete_button);
            expect(delete_button).toBeChecked();
        });
        it( "sets the mode to delete", () => {
            const delete_button = screen.getByRole("radio", {name: /delete/i});
            fireEvent.click(delete_button);
            expect(set_mode).toBeCalledWith("" + App.PLUCK_MODE);
        });
    });
    describe("when the arrange button is checked", function () {
        const set_mode = jest.fn();
        beforeEach(() => {
            render(<ControlFrame mode_names={mode_names} mode={App.PIN_MODE} set_mode={set_mode}/>);
        });
        it( "checks the button", () => {
            const arrange_button = screen.getByRole("radio", {name: /arrange/i});
            fireEvent.click(arrange_button);
            expect(arrange_button).toBeChecked();
        });
        it( "sets the mode to arrange", () => {
            const arrange_button = screen.getByRole("radio", {name: /arrange/i});
            fireEvent.click(arrange_button);
            expect(set_mode).toBeCalledWith("" + App.JET_MODE);
        });
    });
});