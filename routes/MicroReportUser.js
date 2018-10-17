var express = require('express');
var router = express.Router();
var utilitys = require('../custommodules/Utilitys');
var dbo = require("../DataHandler/DbContext");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var costPara = require('../custommodules/constPara');
var config = require("../custommodules/ConfigSite");
var validation = require("../custommodules/validationHandler");
var mallsdk = require("../MallSDK/DefaultClient");
var mallApi = require("../MallSDK/RequestAPI");


router.post('/GetWXBindUser', function (req, res, next) {

    var mallrsp = require('../custommodules/BaseResponse').MallResponse;
    // res.contentType = "application/json";
    //mallrsp.ResponseStatus.ErrorCode = "0";
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
        mallrsp.ResponseStatus.ErrorCode = "80003";
        mallrsp.ResponseStatus.Message = e;
        res.send(mallrsp);
    });
});

router.post("/DeleteUserBindWXToMicroReport", function (req, res, next) {

    var mallrsp = require('../custommodules/BaseResponse').MallResponse;
    dbo.userdb.Delete(req.body.ID).catch(err => {
        console.log(err);
    });

    res.send(mallrsp);
});

module.exports = router;
