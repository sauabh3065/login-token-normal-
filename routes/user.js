const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");

router.post("/signup", user_controller.signup);
router.post('/login',user_controller.login);

module.exports = router;
