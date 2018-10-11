var express = require('express');
var router = express.Router();
//var mallSdkUtilitys = require("../MallSDK/SDKUtiltiys");
var mallsdkAPi = require("../MallSDK/RequestAPI");
var DefaultClient = require("../MallSDK/DefaultClient");
//var log = require("../custommodules/log").logger;
/* GET home page. */
router.get('/', function (req, res, next) {
    // log.info("测试日志");
    // var json = {
    //     title: "dsfsdfs", body: "sfsdfsf", avg: 1,
    //     objects: { aaa: "sssss", ccc: "cccc" },
    //     arrays: [{ aaa: "aaaa", bbb: "bbbb" }, { aaa: "aaaa1", bbb: "bbbb2" }],
    //     ends: "dfdfdfd",
    // };
    // var sign = mallSdkUtilitys.createSign(json, "tpKey", Date.now(), "secretkey");

    let mallSdk = new DefaultClient("");
    let apiRequest = new mallsdkAPi.APIGetHomeDataFromMallRequest({
        "MallID": "ffff",
        "BusinessID": "DDDDD",
        "IsQueryCashFinish": true,
        "IsQueryChannel": true,
        "IsQueryMachineScan": true,
        "IsQueryTodayIncome": true,

    });
    mallSdk.Exce(apiRequest, {
        "ServerUrl": "http://192.168.1.153:9999",
        "secretkey": "secretkey",
        "MallVer": "100000",
        "TPKey": "TPKEY"
    }).then(r => {


    }).catch(err => {
        console.log(err);
    });
    res.render("index", { title: "WelCome" });
});

module.exports = router;
