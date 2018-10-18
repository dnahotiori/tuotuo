var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var mallsdk = require("../MallSDK/DefaultClient");
var mallApi = require("../MallSDK/RequestAPI");
var wechatSdk = require("../WeChatSDK/weChatAPI");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var bllWeChat = require("../BllHandler/bllWeChat");
var constPara = require("../custommodules/constPara");
var MallResponse = require('../custommodules/BaseResponse').MallResponse;


router.post('/businessinfo', function (req, res, next) {
    let mallrsp = new MallResponse();
    for (var o in businessInfo) {
        businessInfo[o] = req.body[o];
    }
    businessInfo.Secretkey = req.body.ChannelKeys;

    //console.log(businessInfo);

    dbo.businessdb.Save(businessInfo).then(d => {

    }).catch(err => {
        console.error(err);
    });
    mallrsp.ResponseStatus.ErrorCode = "0";
    res.contentType = "application/json";
    res.send(mallrsp);
});

router.post("/testconnection", function (req, res, next) {
    let mallrsp = new MallResponse();
    let msdk = new mallsdk();
    var apiRequest = new mallApi.APITestConnectionRequest({
        "OwnedBusiness": req.body.OwnedBusiness,
    });
    msdk.Exce(apiRequest, {
        "ServerUrl": req.body.Backurl,
        "TPKey": "testconnection",
        "secretkey": "testconnection"
    }).then(r => {
        res.send(mallrsp);
    }).catch(e => {
        mallrsp.ResponseStatus.ErrorCode = 80002;
        mallrsp.ResponseStatus.Message = "测试连接异常" + e;
        res.send(mallrsp);
    });
});

router.post("/GetWXQRCCode", function (req, res, next) {
    let mallrsp = new MallResponse();
    dbo.userdb.FindOne({ "OwendBusiness": req.body.BusinessID, OwendEmployee: req.body.EmpId }).then(data => {
        if (data != null) {
            mallrsp.errcode = "99123";
            mallrsp.errmsg = "员工已经绑定微信";
            res.send(mallrsp);
        }
        else {
            return bllWeChat.GetWxQRCode(req.body.BusinessID, req.body.EmpId);

        }
    }).then(data => {
        if (data == undefined)
            return;
        if (data["errcode"] != undefined) {
            mallrsp.errcode = data.errcode;
            mallrsp.errmsg = data.errmsg;
        }
        else {
            mallrsp.expire_seconds = data.expire_seconds;
            mallrsp.ticket = data.ticket;
            mallrsp.url = data.url;
        }
        res.send(mallrsp);
    }).catch(err => {
        console.log(err);
        mallrsp.ResponseStatus.ErrorCode = "9900";
        mallrsp.ResponseStatus.Message = err;
        res.send(mallrsp);
    });

});

router.post("/SendPeriodMessage", function (req, res, next) {
    let mallrsp = new MallResponse();
    res.send(mallrsp);
});

module.exports = router;
