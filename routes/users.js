var express = require('express');
var router = express.Router();
var sessionInfo = require("../custommodules/BaseResponse").SessionInfo;

/* GET users listing. */
router.get('/', function (req, res, next) {

  sessionInfo = req.session.Info;

  res.send(`OpenID:${sessionInfo.openId} Token:${sessionInfo.accessToken}`);
});

module.exports = router;
