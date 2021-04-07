function get_model_terms({terms}) {
    let model_terms = {...terms}
    if (terms && (terms.pk || terms.id)) {
        if (terms.pk) {
            model_terms = terms.fields;
            model_terms.identity = terms.pk;
        } else {
            model_terms.identity = terms.id;
        }
    }
    return model_terms;
}

export {
    get_model_terms,
}
