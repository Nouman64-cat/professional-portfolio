const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected"))
.catch((error) => console.error("Connection failed ", error));

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/authRoute'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
