const { v4: uuidv4 } = require('uuid');
const receiptLists = require("../database/receipts");

const processReceipt = (receipt) => {
    
    const response = {
        "isValid": false,
        "statusCode": 500,
        "message": "Default message!!!"
    };

    const {isValid, message} = checkReceipt(receipt);

    if (isValid) {
        const uuid = uuidv4(); // Generate a v4 UUID
    
        // add condition to check if uuid already exists in the receipts.
        receiptLists[uuid] = calculatePoints(receipt);

        response["isValid"] = true;
        response["statusCode"] = 201;
        response["message"] = `${uuid}`;
    
    }
    else {
        response["isValid"] = false;
        response["statusCode"] = 400;
        response["message"] = message;
    }

    return response;

}


const checkReceipt = (receipt) => {
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
    const [purchaseYear, purchaseMonth, purchaseDay] = purchaseDate.split('-');
    const [purchaseHour, purchaseMinute] = purchaseTime.split(':');

    const purchaseDateTime = new Date(
    purchaseYear,
    purchaseMonth - 1, // Month is zero-based in the Date constructor
    purchaseDay,
    purchaseHour,
    purchaseMinute
    );

    const currentDate = new Date();

    // Check if the JSON values are in the required format and non-empty.
    if(!(typeof retailer === 'string' && retailer) || 
    !(typeof purchaseDate === 'string' && purchaseDate) ||
    !(typeof purchaseTime === 'string' && purchaseTime) || 
    !(Array.isArray(items) && items.length) || 
    !(typeof total === 'string' && total)
    ){
        return {
            "isValid": false,
            "message": "One of the fields is incorrect or empty!"
        };
    }

    // Check if the Purchase Date and Time are valid and in the past.
    if (isNaN(purchaseDateTime) || (purchaseDateTime > currentDate)) {
        return {
            "isValid": false,
            "message": "Date time is incorrect or in the future!"
        };
    }

    // Check whether the items list is properly structred and non empty.
    for (const item of items) {
        if (!(typeof item.shortDescription === 'string' && item.shortDescription) || 
        !(typeof item.price === 'string' && item.price) || 
        !item.shortDescription.trim().length
        ) return {
            "isValid": false,
            "message": "One of the items field is incorrect or empty!"
        };
    }

    // Check whether total matches the sum of items.
    const sum = items.reduce((acc,curr) => acc + parseFloat(curr['price']),0.0).toFixed(2);

    if(sum !== total) return {
        "isValid": false,
        "message": "Total does not match the sum of item prices!"
    };

    // Everything checks out.
    return {
        "isValid": true,
        "message": "Structure correct!"
    };
}


const calculatePoints = (receipt) => {
    let points = 0;
    let currPoints = 0;
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
    const ftotal = parseFloat(total); // Convert to float.
    const purchaseDateTime = new Date(`${purchaseDate}T${purchaseTime}`); // Combine date and time.


    // Rule 1: Add 1 point for every alphanumeric character in the retailer name.
    currPoints = retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    points += currPoints;
    currPoints = 0;


    // Rule 2: 50 points if the total is a round dollar amount.
    if (ftotal === parseInt(ftotal)) {
        currPoints += 50;
    }
    points += currPoints;
    currPoints = 0;


    // Rule 3: 25 points if the total is a multiple of 0.25.
    if (ftotal % 0.25 === 0) {
        currPoints += 25;
    }
    points += currPoints;
    currPoints = 0;
    
    // Rule 4: 5 points for every two items on the receipt.
    currPoints += Math.floor(items.length / 2) * 5;
    points += currPoints;
    currPoints = 0;
    

    // Rule 5: If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer.
    for (const item of items) {
        const trimmedLength = item.shortDescription.trim().length;
        if (trimmedLength % 3 === 0) {
            currPoints += Math.ceil(parseFloat(item.price) * 0.2);
        }
    }
    points += currPoints;
    currPoints = 0;


    // Rule 6: 6 points if the day in the purchase date is odd
    const purchaseDay = purchaseDateTime.getDate().toLocaleString(); // Convert to local timezone.
    if (purchaseDay % 2 !== 0) {
        currPoints += 6;
    }
    points += currPoints;
    currPoints = 0;


     // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const purchaseHour = purchaseDateTime.getHours().toLocaleString(); // Convert to local timezone.
    const purchaseMinute = purchaseDateTime.getMinutes().toLocaleString(); // Convert to local timezone.

    if (purchaseHour > 14 && purchaseHour < 16) {
        currPoints += 10;
    }
    if (purchaseHour == 14 && purchaseMinute > 0) {
        currPoints += 10;
    }
    points += currPoints;
    currPoints = 0;

    return points;
}


module.exports = {processReceipt}