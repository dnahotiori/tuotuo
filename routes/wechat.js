"use strict";
var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var weChatAPI = require("../WeChatSDK/weChatAPI");
var sessionInfo = require("../custommodules/BaseResponse").SessionInfo;

router.get('/', function (req, res, next) {
    const url = weChatAPI.authorizeUrl("/weChat/UserAccesstoken");
    res.redirect(url);
});

router.get('/UserAccesstoken', function (req, res, next) {
    var accessInfo = {};
    weChatAPI.authorizeToken(req.query.code).then(r => {
        console.log(r);
        accessInfo = r;
        return weChatAPI.authorizeUserInfo(r.access_token, r.openid);
    }).then(r => {
        const data = JSON.parse(r);
        console.log(data);
        return dbo.userdb.Save(data.openid, data.nickname, data.headimgurl, accessInfo.access_token, accessInfo.expires_in, accessInfo.refresh_token);
    }).then(r => {
        console.log(r);
        sessionInfo.accessToken = accessInfo.access_token;
        sessionInfo.openId = accessInfo.openid;
        req.session.Info = sessionInfo;

        res.redirect("/users");
    }).catch(error => {
        console.log(error);
        res.send(error);
    });
});

module.exports = router;