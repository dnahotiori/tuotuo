var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var mallsdk = require("../MallSDK/DefaultClient");
var mallApi = require("../MallSDK/RequestAPI");
var wechatSdk = require("../WeChatSDK/weChatAPI");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var constPara = require("../custommodules/constPara");


router.post('/businessinfo', function (req, res, next) {
    let mallrsp = require('../custommodules/BaseResponse').MallResponse;
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
    var mallrsp = require('../custommodules/BaseResponse').MallResponse;
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
    var mallrsp = require('../custommodules/BaseResponse').MallResponse;
    dbo.userdb.FindOne({ "OwendBusiness": req.body.BusinessID, OwendEmployee: req.body.EmpId }).then(data => {
        if (data != null) {
            mallrsp.ResponseStatus.ErrorCode = "99123";
            mallrsp.ResponseStatus.Message = "员工已经绑定微信";
            res.send(mallrsp);
        }
        else {
            return dbo.sysConfigdb.FindOne({ "ConfigType": constPara.AccessToken });

        }
    }).then(data => {
        var content = data.Content;
        var jobj = JSON.parse(content);
        //return wechatSdk.apicreateQrCode(jobj.);
    }).catch(err => {
        console.log(err);
        throw new Error(err);
    });

});

module.exports = router;
