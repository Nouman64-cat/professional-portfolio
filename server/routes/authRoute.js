const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test } = require("../controllers/authController");



//middlewares
router.use(
    cors({
        credentials: true,
        origin: "http://127.0.0.1:5173"
    })
)

router.get('/', test);

module.exports = router;