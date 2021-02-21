import {Identifiable, Nameable, ContentEditable, Timestamped, ModelViewable} from "../../modals";

export function brew({terms}) {
    if (terms && terms.pk) {
        const pk = terms.pk
        terms = terms.fields;
        terms.identity = pk;
    }
    return Object.freeze({
        ...Identifiable.brew({terms, brewer: brew}),
        ...ModelViewable.brew({terms, brewer: brew}),
        ...Timestamped.brew({terms, brewer: brew}),
        ...Nameable.brew({terms, brewer: brew}),
        ...ContentEditable.brew({terms, brewer: brew}),
    });
}