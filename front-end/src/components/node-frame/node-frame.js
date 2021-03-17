import {Identifiable, Nameable, ContentEditable, Timestamped, ModelViewable} from "../../modals";

export function brew({terms}) {
    if (terms && (terms.pk || terms.id)) {
        if (terms.pk) {
            const pk = terms.pk;
            terms = terms.fields;
            terms.identity = pk;
        } else {
            const id = terms.id;
            terms.identity = id;
        }
    }
    return Object.freeze({
        ...Identifiable.brew({terms, brewer: brew}),
        ...ModelViewable.brew({terms, brewer: brew}),
        ...Timestamped.brew({terms, brewer: brew}),
        ...Nameable.brew({terms, brewer: brew}),
        ...ContentEditable.brew({terms, brewer: brew}),
    });
}