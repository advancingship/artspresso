import {Me} from "../../helpers";

export function brew({terms, mixins}) {
    const brewer = brew;
    const mix = Me.get_mix({terms, mixins, brewer});
    const back = {...terms, ...mix};
    const identity = back.model ? back.model.get_identity() : back.id;
    back.arcs = terms.arcs || []
    const front = {
        signature: identity,
        ...mix,
        get_model: () => back.model,
        get_class_name: () => back.class_name,
        get_id: () => identity,
        get_key: () => identity,
        get_mode: () => back.mode,
        get_arcs: () => back.arcs,
        with_arc: ({arc}) => with_arc({arc, terms: back, mixins, brewer: brew}),
        without_arc: ({arc_id}) => without_arc({arc_id, terms: back, mixins, brewer: brew}),
        get_on_click: () => back.on_click,
        get_on_mouse_up: () => back.on_mouse_up,
        get_on_mouse_move: () => back.on_mouse_move,
        get_on_mouse_down: () => back.on_mouse_down,
        get_name_on_input: () => back.name_on_input,
        get_content_on_input: () => back.content_on_input,
        with_reset_handlers: () => brew({
            terms: {
                ...terms,
                on_click: undefined,
                on_mouse_move: undefined,
                on_mouse_up: undefined,
                on_mouse_down: undefined,
            },
            mixins
        }),
        with_on_click: ({on_click}) => brew({terms: {...back, on_click}, mixins}),
        with_on_mouse_move: ({on_mouse_move}) => brew({terms: {...back, on_mouse_move}, mixins}),
        with_on_mouse_up: ({on_mouse_up}) => brew({terms: {...back, on_mouse_up}, mixins}),
        with_on_mouse_down: ({on_mouse_down}) => brew({terms: {...back, on_mouse_down}, mixins}),
        with_model: ({model}) => brew({ terms: {...back, model}, mixins}),
        with_name_on_input: ({name_on_input}) => brew({terms: {...back, name_on_input}, mixins}),
        with_content_on_input: ({content_on_input}) => brew({terms: {...back, content_on_input}, mixins}),
    };
    return Object.freeze(front);
}

function with_arc({arc, terms, mixins, brewer}) {
    return brewer(
        {
            terms: {
                ...terms,
                arcs: Me.pin({
                    array: terms.arcs,
                    element: arc
                }),
            },
            mixins,
            brewer,
        },
    );
}

function  without_arc({arc_id, terms, mixins, brewer}) {
    return brewer({
        terms: {
            ...terms,
            arcs: Object.freeze(terms.arcs.filter(arc => !(arc.get_id() === arc_id))),
        },
        mixins,
        brewer
    });
}
