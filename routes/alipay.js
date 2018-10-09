var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var aliPaySdk = require("../custommodules/AliPayClient");
var sessionInfo = require("../custommodules/BaseResponse").SessionInfo;

router.get('/', function (req, res, next) {
    var url = aliPaySdk.PublicAppAuthorizeUrl(req.query.appId, "/Alipay/UserAccesstoken", "");
    res.redirect(url);
});

router.get("/UserAccesstoken", function (req, res, next) {
    var accessInfo = {};
    aliPaySdk.GetAuthorizeUserInfo(req.query.app_id, req.query.auth_code).then(d => {
        accessInfo = d;
        return dbo.userdb.Save(d.user_id, d.name, d.avatar, d.access_token, d.expires_in, d.refresh_token);
    }).then(d => {
        console.log(d);
        sessionInfo.accessToken = accessInfo.access_token;
        sessionInfo.openId = accessInfo.user_id;
        req.session.Info = sessionInfo;

        res.redirect("/users");
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;
