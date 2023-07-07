const express = require("express");
const router = express.Router();
const { getReceipt, postReceipt } = require("../controller/receiptController");

// API route for POST requests.
router.route('/process').post(postReceipt);
// API route for GET requests.
router.route("/:id/points").get(getReceipt);


module.exports = router;