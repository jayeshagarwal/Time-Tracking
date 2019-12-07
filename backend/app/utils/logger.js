const winston = require('winston');
require('winston-daily-rotate-file');

const path = require("path")
const { appLogging } = require(path.resolve("app/config"))

const errorTransport = new(winston.transports.DailyRotateFile)(appLogging.errorLog);

const commonTransport = new(winston.transports.DailyRotateFile)(appLogging.commonLog);

const errorLogger = winston.createLogger({
    transports: [
        errorTransport
    ]
});

const commonLogger = winston.createLogger({
    transports: [
        commonTransport
    ]
});

const consoleLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info"
        })
    ]
});

module.exports = {
    errorLogger,
    commonLogger,
    consoleLogger
};