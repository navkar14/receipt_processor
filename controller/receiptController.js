// const asyncHandler = require("express-async-handler");
// const receiptLists = require("../database/receipts.json");
const {processReceipt} = require("../middleware/receiptProcessor");
const receiptLists = require("../database/receipts");

// @desc Get points for id
// @route GET /receipts/:id/points
// @access PUBLIC
const getReceipt = (req, res) => {
    const id = req.params.id;
    
    if (receiptLists.hasOwnProperty(id)){
        res.status(200).json({points:`${receiptLists[id]}`});
    }
    else {
        res.status(400).json({"error": "Invalid receipt Id"});
    }
    
}

// @desc Process new receipt
// @route POST /receipts/process
// @access PUBLICs
const postReceipt = (req, res) => {
    const {isValid, statusCode, message} = processReceipt(req.body);
    if (isValid) {
        res.status(statusCode).json({"id": message})
    }
    else {
        res.status(statusCode).json({"error": message});
    }
    
}


module.exports = {
    getReceipt,
    postReceipt
}
