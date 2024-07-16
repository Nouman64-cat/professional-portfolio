const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors);
app.use(express.json());


mongoose
    .connect('mongodb://127.0.0.1:5173/authentication')
    .then(() => console.log("Connected to mongodb"))
    .catch((error) => console.error("Failed to connect DB", error));


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});