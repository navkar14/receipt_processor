
const {processReceipt} = require("../middleware/receiptProcessor");
const { getPointsById } = require("../middleware/pointsGetter");

// @desc Get points for id
// @route GET /receipts/:id/points
// @access PUBLIC
const getReceipt = (req, res) => {
    
    const {isValid, statusCode, message} = getPointsById(req.params.id);

    if (isValid){
        res.status(statusCode).json({"points": message});
    }
    else {
        res.status(statusCode).json({"error": message});
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
