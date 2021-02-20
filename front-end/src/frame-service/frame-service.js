import {URLS} from "../components/app/app";

const API = URLS.back_end_api;

async function api_call({terms}) {
    let all_terms = {
        api: API,
        success: data => console.log("POP DATA:" + data),
        error: error => console.log("POP ERROR:" + error),
    };
    all_terms = {...all_terms, ...terms};
    return await fetch((all_terms.api || API) + all_terms.path, all_terms.init)
        .then(response => response.json())
        .then(json => JSON.parse(json))
        .then(
            all_terms.success,
            all_terms.error
        );
}

async function pop_frames({terms}) {
    terms.path = "/frames/";
    return api_call({terms});
}

async function create_frame({terms}) {
    terms.path = "/frames/new/"
    terms.init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(terms.body) // body terms type must match "Content-Type" header
    }
    return api_call({terms});
}

export {
    API,
    pop_frames,
    create_frame,
}