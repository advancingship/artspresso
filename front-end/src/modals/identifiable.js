export function brew({terms, brewer = brew}) {
    return Object.freeze({
        get_identity: () => terms.identity,
    });
}