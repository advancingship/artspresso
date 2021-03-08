import {URLS} from "../components/app/app";

const API = URLS.back_end_api;
const GET = "GET";
const POST = "POST"
const PUT = "PUT";
const DELETE = "DELETE";

function brew_api_terms({terms}) {
    const all_terms = {
        api: API,
        path: terms.path,
        init: {
            method: terms.method,
            headers: {
                'Content-Type': 'application/json'
            },
        },
        success: terms.success || (data => console.log("POP DATA:" + data)),
        error: terms.error || (error => console.log("POP ERROR:" + error)),
    };
    if (terms.body) {all_terms.init.body = JSON.stringify(terms.body)}
    return all_terms;
}

async function do_get({terms}) {
    const api_terms = brew_api_terms({terms: {...terms, method: GET}});
    return await fetch((api_terms.api || API) + api_terms.path, api_terms.init)
        .then(response => response.json())
        .then(json => {
            try {
                return JSON.parse(json)
            } catch (e) {
                return json;
            }
        })
        .then(
            api_terms.success,
            api_terms.error
        );
}

async function do_post({terms}) {
    const api_terms = brew_api_terms({terms: {...terms, method: POST}});
    return await fetch((api_terms.api || API) + api_terms.path, api_terms.init)
        .then(response => response.json())
        .then(json => JSON.parse(json))
        .then(
            api_terms.success,
            api_terms.error
        );
}

async function do_put({terms}) {
    const api_terms = brew_api_terms({terms: {...terms, method: PUT}});
    return await fetch((api_terms.api || API) + api_terms.path, api_terms.init)
        .then(response => response.json())
        .then(json => JSON.parse(json))
        .then(
            api_terms.success,
            api_terms.error
        );
}

async function do_delete({terms}) {
    const api_terms = brew_api_terms({terms: {...terms, method: DELETE}});
    return await fetch((api_terms.api || API) + api_terms.path, api_terms.init)
        .then(
            api_terms.success,
            api_terms.error
        );
}

async function pop_frames({terms}) {
    terms.path = "/frames/";
    return do_get({terms});
}

async function create_frame({terms}) {
    terms = terms || {};
    terms.path = "/frames/new/"
    return do_post({terms});
}

async function update_frame({terms}) {
    terms.path = "/frames/" + terms.pk + "/update/"
    return do_put({terms});
}

async function delete_frame({terms}) {
    terms.path = "/frames/" + terms.pk + "/delete/";
    return do_delete({terms});
}

async function create_arc({terms}) {
    terms = terms || {};
    terms.path = "/frames/new_arc/"
    return do_post({terms});
}

async function find_associates({terms}) {
    terms = terms || {};
    terms.path = "/frames/" + terms.pk + "/associates/"
    return do_get({terms});
}

export {
    API,
    pop_frames,
    create_frame,
    update_frame,
    delete_frame,
    create_arc,
    find_associates,
}