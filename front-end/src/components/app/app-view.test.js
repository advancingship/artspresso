import React from "react";
import {render, screen} from "@testing-library/react";
import AppView from "./";

describe("<AppView/> Component", () => {
    it("renders app name", () => {
		render(<AppView />);
		const app_name = screen.getByText(/Artspresso/i);
		expect(app_name).toBeInTheDocument();
	});
});
    
