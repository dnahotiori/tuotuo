var express = require('express');
var router = express.Router();
var utilitys = require('../custommodules/Utilitys');
var dbo = require("../DataHandler/DbContext");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var baseResponse = require('../custommodules/BaseResponse').MallResponse;
var costPara = require('../custommodules/constPara');
var config = require("../custommodules/ConfigSite");
var validation = require("../custommodules/validationHandler");
var mallsdk = require("../MallSDK/DefaultClient");
var mallApi = require("../MallSDK/RequestAPI");


router.post('/GetWXBindUser', function (req, res, next) {

    var mallrsp = baseResponse;
    // res.contentType = "application/json";
    mallrsp.ErrorCode = "0";
    dbo.userdb.Find({ "OwendBusiness": req.body.BusinessID, "OwendMall": req.body.MallID }).then(data => {
        let list = [];
        data.forEach((item, index) => {
            list.push({
                ID: item._id,
                WxName: item.nickname,
                EmpId: item.OwendEmployee,
                BindWXTime: item.createDate
            })
        });
        mallrsp.Rows = list;
        res.send(mallrsp);
    }).catch(e => {
        console.log(e);
        mallrsp.ErrorCode = "80003";
        mallrsp.Message = e;
        res.send(mallrsp);
    });
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
        baseResponse.ErrorCode = 80002;
        baseResponse.Message = "测试连接异常" + e;
        res.send(baseResponse);
    });
});

module.exports = router;
