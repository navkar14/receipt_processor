const express = require("express");
const router = express.Router();
const { getReceipt, postReceipt } = require("../controller/receiptController");


router.route('/process').post(postReceipt);

router.route("/:id/points").get(getReceipt);


module.exports = router;