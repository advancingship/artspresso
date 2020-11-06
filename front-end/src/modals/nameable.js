export function brew({terms, brewer = brew}) {
    return Object.freeze({
        get_name: () => terms.name,
        with_name: ({name}) => brewer({terms: {...terms, name}}),
    });
}