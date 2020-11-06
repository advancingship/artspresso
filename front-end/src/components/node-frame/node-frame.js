import {Nameable, ContentEditable} from "../../modals";

export function brew({terms}) {
    return Object.freeze({
        get_creation_datetime: () => terms.creation_datetime,
        get_modification_datetime: () => terms.modification_datetime,
        get_model_view: () => terms.model_view,
        ...Nameable.brew({terms, brewer: brew}),
        ...ContentEditable.brew({terms, brewer: brew}),
    })
}