var express = require('express');
var router = express.Router();
var dbo = require("../DataHandler/DbContext");
var MallResponse = require('../custommodules/BaseResponse').MallResponse;


router.post('/GetWXBindUser', function (req, res, next) {

    var mallrsp = new MallResponse();
    // res.contentType = "application/json";
    //mallrsp.ResponseStatus.ErrorCode = "0";
    dbo.userdb.Find({ "OwendBusiness": req.body.BusinessID, "IsDelete": false }).then(data => {
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

    var mallrsp = new MallResponse();
    dbo.userdb.Delete(req.body.ID).catch(err => {
        console.log(err);
    });

    res.send(mallrsp);
});

module.exports = router;
