import React from "react";
import {render, screen} from "@testing-library/react"
import ContentFrameView, {ContentFrame} from "./";
import NodeFrameView, {NodeFrame} from "../node-frame"

describe("<ContentFrameView/> Component", () => {

    describe("pass a content-frame with a model", () => {
        it("renders a wrapper div for a model", () => {
            render(<ContentFrameView {...ContentFrame.brew({
                terms: {
                    model: NodeFrame.brew({
                        terms: {
                            model_view: NodeFrameView
                        }
                    }),
                }
            })} />);
            const content_frame_view = screen.getByRole("document")
            expect(content_frame_view.closest("div")).toHaveAttribute("role"
                , expect.stringMatching("document"));
        });
    });
});
