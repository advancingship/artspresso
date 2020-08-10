import React from "react";
import {render, screen, fireEvent} from "@testing-library/react"
import { MouseEventHelper } from "../helpers";


describe("MouseEventHelper.getFakeMouseEvent()", () => {
    it("takes 'mousedown', {bubbles, pageX, pageY} and returns correct x and y", () => {
        const e = MouseEventHelper.get_fake_mouse_event('mousedown'
            , {bubbles: true, pageX: 250, pageY: 251}
        );
        render(<div data-testid="test-id" onMouseDown={(event) => {
            event.target.innerHTML = "x " + event.pageX + " y " + event.pageY;
        }}/>);
        const div = screen.getByTestId("test-id");
        fireEvent(div, e);
        expect(div).toHaveTextContent("x 250 y 251");
    });
    it("activates onclick function", () => {
        const down = MouseEventHelper.get_fake_mouse_event('mousedown'
            , {bubbles: true, pageX: "250px", pageY: "251px"}
        );
        const up = MouseEventHelper.get_fake_mouse_event('click'
            , {bubbles: true, pageX: "250px", pageY: "251px"}
        );
        const on_click = jest.fn();
        render(<div data-testid="test-id" onClick={on_click} />);
        const div = screen.getByTestId("test-id");
        fireEvent(div, down);
        fireEvent(div, up);
        expect(on_click).toHaveBeenCalledTimes(1);
    });
});