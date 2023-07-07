const { v4: uuidv4 } = require('uuid');
const receiptLists = require("../database/receipts");

// Process receipts object.
const processReceipt = (receipt) => {
    
    const response = {
        "isValid": false,
        "statusCode": 500,
        "message": "Default message!!!"
    }; // Default response message.

    // Check whether the structure of the receipt object is valid.
    const {isValid, message} = checkReceipt(receipt);

    if (isValid) {
        // Generate a v4 UUID
        const uuid = uuidv4(); 

        // Calculate the points for a receipt.
        receiptLists[uuid] = calculatePoints(receipt); 

        response["isValid"] = true;
        response["statusCode"] = 201;
        response["message"] = `${uuid}`;
    }
    else { // Generate error message.
        response["isValid"] = false;
        response["statusCode"] = 400;
        response["message"] = message;
    }

    return response;

}

// Checks the validity of the fields in the receipt.
const checkReceipt = (receipt) => {
    // Destrucutre the fields in receipt object.
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
    const purchaseDateTime = new Date(`${purchaseDate}T${purchaseTime}`);
    const currentDate = new Date();

    // Check whether the key-value pairs are properly structured and non-empty.
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

    // Check whether the Purchase Date and Time are valid and in the past.
    const isDateValid = (dateString) => (!isNaN(new Date(dateString)) && new Date(dateString).toString() !== "Invalid Date");
    const isTimeValid = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);
      
        return (
          !isNaN(parsedHours) &&
          !isNaN(parsedMinutes) &&
          parsedHours >= 0 &&
          parsedHours <= 23 &&
          parsedMinutes >= 0 &&
          parsedMinutes <= 59
        );
      };
      
    if (!isDateValid(purchaseDate) || !isTimeValid(purchaseTime) || isNaN(purchaseDateTime) || (purchaseDateTime > currentDate)) {
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
    if(sum !== total){
        return {
            "isValid": false,
            "message": "Total does not match the sum of item prices!"
        };
    }

    // Everything checks out.
    return {
        "isValid": true,
        "message": "Structure validation complete!"
    };
}

// Calculate the points for a receipt object.
const calculatePoints = (receipt) => {

    let totalPoints, currPoints;
    // Destrucutre the fields in receipt object.
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;
    const ftotal = parseFloat(total);
    const purchaseDateTime = new Date(`${purchaseDate}T${purchaseTime}`);

    totalPoints = 0;
    currPoints = 0;


    // Rule 1: Add 1 point for every alphanumeric character in the retailer name.
    currPoints = retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    totalPoints += currPoints;

    currPoints = 0;

    // Rule 2: 50 points if the total is a round dollar amount.
    if (parseInt(ftotal) !== 0 && ftotal === parseInt(ftotal)) {
        currPoints += 50;
    }
    totalPoints += currPoints;

    currPoints = 0;

    // Rule 3: 25 points if the total is a multiple of 0.25.
    if (parseInt(ftotal) && ftotal % 0.25 === 0) {
        currPoints += 25;
    }
    totalPoints += currPoints;

    currPoints = 0;

    // Rule 4: 5 points for every two items on the receipt.
    currPoints += Math.floor(items.length / 2) * 5;
    totalPoints += currPoints;

    currPoints = 0;

    // Rule 5: If the trimmed length of the item description is a multiple of 3, multiply it's price by 0.2 and round up to the nearest integer.
    for (const item of items) {
        const trimmedLength = item.shortDescription.trim().length;
        if (trimmedLength % 3 === 0) {
            currPoints += Math.ceil(parseFloat(item.price) * 0.2);
        }
    }
    totalPoints += currPoints;

    currPoints = 0;

    // Rule 6: 6 points if the day in the purchase date is odd
    const purchaseDay = purchaseDateTime.getDate().toLocaleString(); // Convert to local timezone.
    if (!isNaN(purchaseDay) && purchaseDay % 2 !== 0) {
        currPoints += 6;
    }
    totalPoints += currPoints;

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
    totalPoints += currPoints;

    return totalPoints;
}
// Separate exports for TESTING, DEVELOPMENT and PRODUCTION environments.
if (process.env.NODE_ENV === 'testing') {
    module.exports = {
        processReceipt,
        checkReceipt,
        calculatePoints
    }
  }
else {
    module.exports = {processReceipt}
}
