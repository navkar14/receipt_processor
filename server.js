const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use('/receipts', require("./routes/receiptRouter"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});