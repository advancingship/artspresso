import {Me} from "./";

describe("return_state", () => {
    it("assigns new state to a state setter function", () => {
        const setter = jest.fn().mockImplementation((x) => { return x});
        const state = {foo: "bar"};
        const result = Me.return_state({state, setter})
        expect(setter).toBeCalledTimes(1);
        expect(setter(state)).toEqual(result())
    });
});

describe( "get_fields", () => {
    it("returns a map of the results of the getters", () => {
        const model = Me.brew({terms: {
                foo: "oof",
                baz: "zab",
                get_foo: () => "foo",
                with_foo: () => new Error(),
                get_bar: () => "bar",
                get_baz: () => {return {baz: "baz"}},
                get_bop: () => new Error(),
            }});
        const fields = ["foo", "bar", "biz", "baz"];
        expect(Me.get_fields({model, fields})).toStrictEqual(
            {foo: "foo", bar: "bar", baz: {baz: "baz"}, undefined: undefined})
    })

})
