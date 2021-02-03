export function brew({terms}) {
    return Object.freeze({
        get_creation_datetime: () => terms.creation_datetime,
        get_modification_datetime: () => terms.modification_datetime,
    });
}