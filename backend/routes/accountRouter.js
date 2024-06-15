const express = require("express");
const register = require("../controllers/register");
const login = require("../controllers/login");
const userdets = require("../controllers/usersdets");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.get("/usersdets",protect,userdets);

module.exports = router;