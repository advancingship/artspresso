function brew({terms, mixins, brewer = brew}){
    return Object.freeze({
        ...terms,
        with: (changes) => brew({terms: {...terms, ...changes}, mixins, brewer}),
    });
}

function pin({array, element}) {
    const freeze_ray = [...array]
    freeze_ray.push(element);
    return Object.freeze(freeze_ray);
}

function return_state({state, setter}) {
    const inner = () => {return state}
    setter(inner);
    return inner;
}

function get_mix({terms, mixins, brewer = brew}) {
    if (mixins) {
        return mixins.reduce((accumulator, mixin) => {
            return {...accumulator, ...mixin({terms, mixins, brewer})}
        }, {});
    } else {
        return undefined;
    }
}

function get_fields({model = {}, fields = []}) {
    return Object.fromEntries(new Map(fields.map(key => {
        const getter = model["get_" + key];
        return getter ? [key, getter()] : [];
    })).entries())
}

export{
    brew,
    return_state,
    pin,
    get_mix,
    get_fields,
}