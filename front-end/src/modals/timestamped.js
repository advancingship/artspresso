export function brew({terms, brewer = brew}) {
    return Object.freeze({
        get_creation_datetime: () => terms.creation_datetime,
        get_modification_datetime: () => terms.modification_datetime,
        with_modification_datetime: ({modification_datetime}) => brewer({terms: {...terms, modification_datetime}}),
    });
}