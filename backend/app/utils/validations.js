module.exports = {
    requestParamValidation: (dataObject, validateWith) => {
        let errors = {
            code: 400,
            messages: {},
            length: 0
        };
        if (validateWith.length <= 0) {
            return {
                length: 0
            }
        }
        for (var key of validateWith) {
            if (key instanceof Object) {
                let len = key.validate.length;
                for (let i = 0; i < len; i++) {
                    errors.messages[key.param] = [];
                    switch (key.validate[i]) {
                        case "empty":
                            let emptyResponse = module.exports.emptyValidate(dataObject[key.param]);
                            if (!emptyResponse) {
                                errors.messages[key.param].push(`${key} field is Required.`);
                                errors.length += 1;
                            }
                        case "email":
                            let emailResponse = module.exports.emailValidate(dataObject[key.param]);
                            if (!emailResponse) {
                                errors.messages[key.param].push(`${key.param} is Invalid.`);
                                errors.length += 1;
                            }
                    }
                }
            } else {
                errors.messages[key] = [];
                if (!module.exports.emptyValidate(dataObject[key])) {
                    errors.messages[key].push(`${key} field is Required.`);
                    errors.length += 1;
                }
            }
        }

        return {
            length: errors.length,
            errors: errors
        }
    },

    emailValidate: (email) => {
        var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(emailFormat)) {
            return true;
        }

        return false;
    },

    emptyValidate: (param) => {
        if (param === undefined || param === null || param === "" || param == NaN) {
            return false;
        }

        return true;
    },

    urlValidate: (url) => {
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (re.test(url)) {
            return true;
        }

        return false;
    }

}