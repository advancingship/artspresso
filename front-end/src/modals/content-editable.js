export function brew({terms, brewer = brew}) {
    return Object.freeze({
        get_content: () => terms.content,
        with_content: ({content}) => brewer({terms: {...terms, content}}),
    });
}