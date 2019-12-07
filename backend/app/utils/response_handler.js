const path = require("path")

const customError = require(path.resolve("app/utils/custom_error"));
const { consoleLogger } = require(path.resolve("app/utils/logger"));

module.exports = {
    _success: (data) => {
        return {
            success: true,
            data: data
        };
    },

    _error: (e) => {

        /**
         * TODO:: Log Error
         */
        console.log(e);
        consoleLogger.info()

        return {
            success: false,
            code: e.code,
            singleStringMessage: e.message ? e.message.replace(/\s+$/g, '.') : e.message,
            error: e.error
        };
    }
}