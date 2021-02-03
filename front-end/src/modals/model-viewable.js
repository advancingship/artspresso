export function brew({terms}) {
    return Object.freeze({
        get_model_view: () => terms.model_view,
    });
}