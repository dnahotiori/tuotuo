var express = require('express');
var router = express.Router();
var utilitys = require('../custommodules/Utilitys');
var dbo = require("../DataHandler/DbContext");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var baseResponse = require('../custommodules/BaseResponse').BaseResponse;
var costPara = require('../custommodules/constPara');
var config = require("../custommodules/ConfigSite");
var validation = require("../custommodules/validationHandler");
var mallsdk = require("../MallSDK/DefaultClient");
var mallApi = require("../MallSDK/RequestAPI");


router.post('/businessinfo', function (req, res, next) {
    for (var o in businessInfo) {
        businessInfo[o] = req.body[o];
    }
    businessInfo.Secretkey = req.body.ChannelKeys;

    //console.log(businessInfo);

    dbo.businessdb.Save(businessInfo).then(d => {

    }).catch(err => {
        console.error(err);
    });
    baseResponse.Code = "0";
    res.contentType = "application/json";
    res.send(baseResponse);
});

router.post("/testconnection", function (req, res, next) {
    let msdk = new mallsdk();
    var apiRequest = new mallApi.APITestConnectionRequest({
        "OwnedBusiness": req.body.OwnedBusiness,
    });
    msdk.Exce(apiRequest, {
        "ServerUrl": req.body.Backurl,
        "TPKey": "testconnection",
        "secretkey": "testconnection"
    }).then(r => {
        res.send(baseResponse);
    }).catch(e => {
        baseResponse.Code = 80002;
        baseResponse.Message = "测试连接异常" + e;
        res.send(baseResponse);
    });
});

module.exports = router;
