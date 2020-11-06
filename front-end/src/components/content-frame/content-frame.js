import {Me} from "../../helpers";

export function brew({terms, mixins}) {
    const brewer = brew;
    const mix = Me.get_mix({terms, mixins, brewer});
    const back = {...terms, ...mix};
    const front = {
        signature: back.id,
        ...mix,
        get_model: () => back.model,
        get_class_name: () => back.class_name,
        get_id: () => back.id,
        get_key: () => back.key,
        get_mode: () => back.mode,
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