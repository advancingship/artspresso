import { renderHook, act } from '@testing-library/react-hooks';
import { useNodeFrame } from '.';

describe("useNodeFrame", () => {

    describe("test_id", () => {

        it("defaults to node-frame-test-id", () => {
            const {result} = renderHook(() => useNodeFrame());
            expect(result.current.test_id).toBe("node-frame-test-id")
        });

        it("returns the test_id prop", () => {
            const {result} = renderHook(() => useNodeFrame({test_id: "test-id"}));
            expect(result.current.test_id).toBe("test-id")
        });
    });

    describe("name", () => {

        it("defaults to empty string", () => {
            const {result} = renderHook(() => useNodeFrame());
            expect(result.current.name).toBe("")
        });

        it("returns the name prop", () => {
            const {result} = renderHook(() => useNodeFrame({name: "test-name"}));
            expect(result.current.name).toBe("test-name")
        });
    });

    describe("content", () => {

        it("defaults to empty string", () => {
            const {result} = renderHook(() => useNodeFrame());
            expect(result.current.content).toBe("")
        });

        it("returns the content prop", () => {
            const {result} = renderHook(() => useNodeFrame({content: "test-content"}));
            expect(result.current.content).toBe("test-content")
        });
    });

    describe("sizing", () => {

        it("defaults to full-frame", () => {
            const {result} = renderHook(() => useNodeFrame());
            expect(result.current.sizing).toBe("full-frame")
        });

        it("returns the sizing prop", () => {
            const {result} = renderHook(() => useNodeFrame({sizing: "test-sizing"}));
            expect(result.current.sizing).toBe("test-sizing")
        });
    });

    describe("style", () => {

        it("defaults to undefined", () => {
            const {result} = renderHook(() => useNodeFrame());
            expect(result.current.style).toBeUndefined();
        });

        it("returns the style prop", () => {
            const {result} = renderHook(() => useNodeFrame({style: {width: "50px"}}));
            expect(result.current.style.width).toBe("50px")
        });

    });

    it ("passes the parent_props to child_frames", () => {
        const child_props = {}
        const expected_parent_props = {test_id: "parent-frame-id", child_frames: [child_props]};
        const {result} = renderHook(() => useNodeFrame(expected_parent_props))
        const parent_props = result.current.child_frames[0].parent_props;
        expect(parent_props).toBeDefined()
    });

    describe("handle_click", () => {

        describe("when useNodeFrame gets no props", () => {

            it("is undefined", () => {
                const {result} = renderHook(() => useNodeFrame());
                expect(result.current.handle_click).toBeUndefined();
            });

        });

        describe("when create mode is passed to useNodeFrame", () => {

            it( "adds props for new NodeFrame to child_nodes array", () => {
                const {result} = renderHook(() => useNodeFrame({
                    mode: "1"}
                    ));
                expect(result.current.child_frames).toStrictEqual([]);
                act(() => {
                    result.current.handle_click();
                });
                expect(result.current.child_frames.length).toBe(1);
            });
        });

        describe("when delete mode is passed to useNodeFrame", () => {

            it( "removes props of a child NodeFrame from child_frames of parent", () => {
                const parent_props = {mode: "2"};
                const child_props = {mode: "2", child_number: "0", parent_props: parent_props};
                parent_props.set_child_frames = jest.fn().mockImplementation(
                    (new_child_frames) => {return parent_props.child_frames = new_child_frames;});
                parent_props.set_child_frames([child_props]);
                expect(parent_props.child_frames.length).toBe(1);
                const {result} = renderHook(() => useNodeFrame({...child_props}));
                act(() => {
                    result.current.handle_click();
                });
                expect(result.current.parent_props.child_frames.length).toBe(0);

            });
        });
        describe("when arrange mode is passed to useNodeFrame", () => {
            describe("if the clicked NodeFrame has no parent", () => {
                it("mouse down, move and up are undefined so they won't render ", () => {
                    const node_frame = {mode: "3", style: {top: "50px"} };
                    const {result} = renderHook(() => useNodeFrame(node_frame));
                    expect(result.current.handle_mouse_down).toBeUndefined()
                    expect(result.current.handle_mouse_move).toBeUndefined();
                    expect(result.current.handle_mouse_up).toBeUndefined();
                });
            });
            describe("if the clicked NodeFrame has a parent", () => {
                it( "it changes the positioning style", () => {
                    const parent_props = {mode: "3", set_child_frames: jest.fn()};
                    const child_props = {mode: "3", parent_props: parent_props
                        , style: {top: "250px", left: "250px"}};
                    parent_props.child_frames = [child_props];
                    const {result} = renderHook(() => useNodeFrame({...child_props}));
                    act(() => {
                        const mock_mouse_event = {currentTarget: {style: child_props.style}, pageX: 251, pageY: 251}
                        result.current.handle_mouse_down();
                        result.current.handle_mouse_move(mock_mouse_event);
                        result.current.handle_mouse_up(mock_mouse_event);
                    });
                    expect(result.current.style).toStrictEqual({top: "211px", left: "141px"});
                });
            });
        });
    });
});