const path = require("path");

const errorCodes = require(path.resolve("app/static/error_codes"));

class CustomError extends Error {
    constructor(code = "GENERIC", conf = {}) {
        super(code);

        const lang = conf.lang ? conf.lang : "en";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        code = errorCodes[lang][code] ? code : "GENERIC"

        this.code = code;
        this.status = conf.status || errorCodes[lang][code].status;
        this.description = conf.message || errorCodes[lang][code].message;

    }
}

module.exports = CustomError;