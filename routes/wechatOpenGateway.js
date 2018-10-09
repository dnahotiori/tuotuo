var express = require('express');
var router = express.Router();
var xmlBody = require("../custommodules/customFilt").XmlBody;
var dbo = require("../DataHandler/DbContext");
var constPara = require("../custommodules/constPara");
var weChatTask = require('../autoSchedule/weChatTask');
var weChatApi = require("../WeChatSDK/weChatAPI");

router.post('/WeChatPush', xmlBody, function (req, res, next) {
    let jsonXml = req.body.xml;
    console.log(jsonXml);
    let jsonObj = jsonXml.xml;
    switch (jsonObj.InfoType) {
        //取消授权
        case "unauthorized":

            break;
        //更新授权
        case "authorized":
        case "updateauthorized":
            break;
        //推送Ticket
        case "component_verify_ticket":
            dbo.sysConfigdb.Save(constPara.ComponentVerifyTicket, jsonObj.ComponentVerifyTicket);
            break;
    }

    res.contentType = "text/html";
    res.send("success");
});

router.get("/authorizedORCode", function (req, res, next) {
    weChatTask.RefreshComponentToken();
    dbo.sysConfigdb.GetComponentAccessToken().then(d => {
        return weChatApi.preAuthCode(d);
    }).then(d => {
        let url = weChatApi.componentloginpage(d.pre_auth_code,
            `/weChat/gateway/authorizedCallBack?MallInfo=${req.query.BusinessID}|${req.query.MallID}`);
        res.send(`<script> window.location.href='${url}'</script>`)
    }).catch(err => {
        console.error(err);
        res.statusCode(500).jsonp(err);
    });
});

router.get("/authorizedCallBack", function (req, res, next) {
    let mallInfo = req.query.MallInfo;
    let BusinessID = mallInfo.split('|')[0];
    let MallID = mallInfo.split('|')[1];
    let auth_code = res.query.auth_code;

    console.log(mallInfo);
    dbo.sysConfigdb.GetComponentAccessToken().then(d => {
        return weChatApi.apiQueryAuth(d, auth_code)
    }).then(d => {
        var authInfo = {
            OpenAPIType: constPara.AUTHOR_WX,
            authorizer_appid: d.authorization_info.authorizer_appid,
            authorizer_access_token: d.authorization_info.authorizer_access_token,
            expires_in: d.authorization_info.expires_in,
            re_expires_in: d.authorization_info.re_expires_in,
            authorizer_refresh_token: d.authorization_info.authorizer_refresh_token,
            alias: d.authorization_info.alias,
            principal_name: d.authorization_info.principal_name,
            service_type_info: d.authorization_info.service_type_info
        };

        return dbo.businessdb.UpdateAuthorInfo(authInfo, BusinessID);
    }).catch(err => {
        console.error(err);
    });

    res.send("success");
});

module.exports = router;