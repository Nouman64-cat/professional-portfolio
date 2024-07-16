const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use('/', require('./routes/authRoute'))

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port htps://localhost:${8000}`))