import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import AppView from "./";
import {FrameService} from "../../frame-service";
import {server} from "../../api-mocks/server"

beforeAll(() => {
	// Enable the mocking in tests.
	server.listen()
})

afterEach(() => {
	// Reset any runtime handlers tests may use.
	server.resetHandlers()
})

afterAll(() => {
	// Clean up once the tests are done.
	server.close()
})

describe("<AppView/> Component", () => {
	beforeEach(() => {
		render(<AppView />);
	});
    it("renders app name", () => {
		const app_name = screen.getByText(/Artspresso/i);
		expect(app_name).toBeInTheDocument();
	});

    describe("when the top bar is clicked", () => {
    	it( "queries for associates", () => {
			const heading = screen.getByText("Artspresso");
			const find_associates = jest.spyOn(FrameService, "find_associates");
			fireEvent.click(heading);
			expect(find_associates).toBeCalled()
		});
		it( "renders the associates with correct sense-ids", async () => {
			const heading = screen.getByText("Artspresso");
			fireEvent.click(heading);
			const search_string = "to have a quantity of executions, mister"
			var have_times;
			await waitFor(() => {
				have_times = screen.getByText(search_string)
			});
			expect(have_times).toBeInTheDocument();
		});
	});
});
    
