module.exports = {
    server: {
        port: process.env.PORT,
        baseURL: process.env.BASE_URL,
    },
    mongo: {
        port: process.env.MONGO_PORT,
        host: process.env.MONGO_HOST,
        name: process.env.MONGO_DB_NAME
    },
    environment: process.env.NODE_ENV,
    appLogging: {
        errorLog: {
            filename: `${process.env.LOG_PATH}/error/log_%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: process.env.ERROR_LOG_MAX_FILES,
            level: "error"
        },
        commonLog: {
            filename: `${process.env.LOG_PATH}/error/log_%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: process.env.COMMON_LOG_MAX_FILES,
            level: "info"
        }
    }
}