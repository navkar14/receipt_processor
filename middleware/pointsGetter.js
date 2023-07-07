const receiptLists = require('../database/receipts');

// Retrieve points for an Id.
const getPointsById = (id) => {
    const response = {
        "isValid": false,
        "statusCode": 500,
        "message": "Default message!"
    }

    const {isValid, message} = checkId(id);
    if (isValid) {

        response["isValid"] = true;
        response["statusCode"] = 200;
        response["message"] = message;
    }
    else {
        response["isValid"] = false;
        response["statusCode"] = 400;
        response["message"] = message;

    }
    return response;

}

// Check whether the receipt id is properly structured and non-empty.
const checkId = (id) => {
    if (receiptLists.hasOwnProperty(id)) {
        return {
            "isValid": true,
            "message": receiptLists[id]
        }
    }
    if (id === '') {
        return {
            "isValid": false,
            "message": "Receipt Id is required!"
        }
    }
    const isUUID = (id) => {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(id);
    };
    if (!isUUID(id)) {
        return {
            "isValid": false,
            "message": "Invalid receipt Id format!"
        }
    }
    else {
        return {
            "isValid": false,
            "message": "Receipt Id not found!"
        }
    }
}

// Separate exports for TESTING, DEVELOPMENT and PRODUCTION environments.
if (process.env.NODE_ENV === 'testing') {
    module.exports = {
        getPointsById,
        checkId
    }
}
else {
    module.exports = {
        getPointsById
    }
}
