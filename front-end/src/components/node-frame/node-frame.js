import {Nameable, ContentEditable, Timestamped, ModelViewable} from "../../modals";

export function brew({terms}) {
    return Object.freeze({
        ...ModelViewable.brew({terms, brewer: brew}),
        ...Timestamped.brew({terms, brewer: brew}),
        ...Nameable.brew({terms, brewer: brew}),
        ...ContentEditable.brew({terms, brewer: brew}),
    })
}