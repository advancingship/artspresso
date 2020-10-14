export function brew({terms}) {
    return Object.freeze({
        get_name: () => terms.name,
        get_content: () => terms.content,
        get_creation_datetime: () => terms.creation_datetime,
        get_modification_datetime: () => terms.modification_datetime,
        get_model_view: () => terms.model_view
    })
}