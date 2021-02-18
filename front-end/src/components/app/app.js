const PIN = "Create";
const PLUCK = "Delete";
const JET = "Arrange";
const TIE = "Relate";
const MODE_NAMES = [PIN, PLUCK, JET, TIE];
const PIN_MODE = "" + MODE_NAMES.indexOf(PIN);
const PLUCK_MODE = "" + MODE_NAMES.indexOf(PLUCK);
const JET_MODE = "" + MODE_NAMES.indexOf(JET);
const TIE_MODE = "" + MODE_NAMES.indexOf(TIE);
const URLS = {};

if (process.env.NODE_ENV !== "production") {
    URLS.back_end_api = "localhost";
} else {
    URLS.back_end_api = "api.advancingship.com";
}


export {
    PIN,
    PLUCK,
    JET,
    TIE,
    MODE_NAMES,
    PIN_MODE,
    PLUCK_MODE,
    JET_MODE,
    TIE_MODE,
    URLS,
}
