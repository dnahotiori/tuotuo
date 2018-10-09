var express = require('express');
var router = express.Router();
//var log = require("../custommodules/log").logger;
/* GET home page. */
router.get('/', function (req, res, next) {
 // log.info("测试日志");
 return res.render("index", { title: "WelCome" });
});

module.exports = router;
