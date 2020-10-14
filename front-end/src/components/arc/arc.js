const brew = function ({terms, mixins, brewer = brew}) {
    return Object.freeze({
        get_sense: () => terms.sense,
        get_sink: () => terms.sink,
        with_sense: ({sense}) => brewer({terms: {...terms, sense}, mixins, brewer}),
        with_sink: ({sink}) => brewer({terms: {...terms, sink}, mixins, brewer}),
    })
}

export {
    brew,
}