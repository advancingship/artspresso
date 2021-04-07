import {Identifiable, Nameable, ContentEditable, Timestamped, ModelViewable} from "../../modals";
import {get_model_terms} from "../../frame-service/frame-service-model";

export function brew({terms}) {
    terms = get_model_terms({terms})
    return Object.freeze({
        ...Identifiable.brew({terms, brewer: brew}),
        ...ModelViewable.brew({terms, brewer: brew}),
        ...Timestamped.brew({terms, brewer: brew}),
        ...Nameable.brew({terms, brewer: brew}),
        ...ContentEditable.brew({terms, brewer: brew}),
    });
}