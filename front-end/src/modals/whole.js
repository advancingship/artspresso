import Arc from "../components/arc";
import {Me} from "../helpers";

const HAVE_PART = "have_part";

function brew({terms, mixins, brewer = brew}) {
    return Object.freeze({
        get_parts: () => get_parts(terms),
        with_parts: (parts) => with_parts({parts, terms, mixins, brewer}),
        get_part: part_id => get_part({part_id, terms}),
        with_part: part => with_part({part, terms, mixins, brewer}),
        without_part: part_id => without_part({part_id, terms, mixins, brewer}),
    });
}

function get_parts(terms) {
    return terms.arcs.filter(arc => arc.get_sense() === HAVE_PART).map(arc => arc.get_sink());
}

function get_part({part_id, terms}) {
    return (terms.arcs.filter(
        arc => arc.get_sense() === HAVE_PART && arc.get_sink().get_id() === part_id
    ))[0].get_sink();
}

function with_part({part, terms, mixins, brewer}) {
    return brewer(
        {
            terms: {
                ...terms,
                arcs: Me.pin({
                    array: terms.arcs,
                    element: Arc.brew({terms: {sense: HAVE_PART, sink: part}})
                }),
            },
            mixins,
            brewer,
        },
    );
}

function  without_part({part_id, terms, mixins, brewer}) {
    return brewer({
        terms: {
            ...terms,
            arcs: Object.freeze(terms.arcs.filter(arc =>
                !(arc.get_sense() === HAVE_PART && arc.get_sink().get_id() === part_id)
            )),
        },
        mixins,
        brewer
    });
}

function with_parts({parts, terms, mixins, brewer}) {
    return brewer({
        terms: {
            ...terms,
            arcs: [
                ...terms.arcs.filter(arc => arc.get_sense() !== HAVE_PART),
                ...parts.map(part => Arc.brew(
                    {
                        terms: {
                            sense: HAVE_PART,
                            sink: part,
                        }
                    }
                ))
            ]
        },
        mixins,
        brewer,
    })
}

export {
    brew,
    HAVE_PART,
}