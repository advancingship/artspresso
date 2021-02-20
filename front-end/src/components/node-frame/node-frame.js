import {Nameable, ContentEditable, Timestamped, ModelViewable} from "../../modals";

export function brew({terms}) {
    if (terms && terms.pk) {
        terms = terms.fields;
    }
    return Object.freeze({
        ...ModelViewable.brew({terms, brewer: brew}),
        ...Timestamped.brew({terms, brewer: brew}),
        ...Nameable.brew({terms, brewer: brew}),
        ...ContentEditable.brew({terms, brewer: brew}),
    });
}