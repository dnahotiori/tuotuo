"use strict";
var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var weChatAPI = require("../WeChatSDK/weChatAPI");
var sessionInfo = require("../custommodules/BaseResponse").SessionInfo;
var weChatTask = require('../autoSchedule/weChatTask');
var utilitys = require("../custommodules/Utilitys");

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

router.get("/qrCode", function (req, res, next) {
    //res.contentType = "application/json";
    dbo.sysConfigdb.GetAccessToken().then(d => {
        var token = JSON.parse(d);
        var scene_str = `${req.query.MallID}_${req.query.BusinessID}`
        return weChatAPI.apicreateQrCode(token.access_token, scene_str);
    }).then(d => {
        //res.send(d);
        return weChatAPI.apishowqrcode(d.ticket);

    }).then(d => {
        res.contentType = 'image/png';
        res.writeHead(200, "Ok");
        res.write(d, "binary"); //格式必须为 binary，否则会出错
        res.end();
    }).catch(err => {
        console.error(err);
        res.send(err.message);
    })
});

router.get("/AccessToken", function (req, res, next) {

    weChatTask.RefreshAccessToken();
    res.send("commend");
});

module.exports = router;