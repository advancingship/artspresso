import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./";

describe("<App/> Component", () => {
    it("renders app name", () => {
		render(<App />);
		const app_name = screen.getByText(/Artspresso/i);
		expect(app_name).toBeInTheDocument();
	});
});
    
