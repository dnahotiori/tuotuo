var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var baseResponse = require('../custommodules/BaseResponse').MallResponse;
var mallsdk = require("../MallSDK/DefaultClient");
var mallApi = require("../MallSDK/RequestAPI");


router.post('/businessinfo', function (req, res, next) {
    let mallrsp = baseResponse;
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
    var mallrsp = baseResponse;
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

module.exports = router;
