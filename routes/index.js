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
    var authInfo = {
        ServerUrl: "http://192.168.1.153:9999",
        TPKey: "TPKEY",
        secretkey: "secretkey",
        MallVer: "100000",
    }
    let mallSdk = new DefaultClient("");
    let apiRequest = new mallsdkAPi.APIMallAuthorRequest({
        "mallCode": "40000",
        "MallID": "ffff",
        "moduleCode": "40000",
        "BusinessID": "DDDDD"
    });
    mallSdk.Exce(apiRequest);
    
   // mallSdk.
    //var mallsdk = new mallsdkAPi("http://192.168.1.153:9999");
    //mallsdk.TestConnectionRequest({});
    res.render("index", { title: "WelCome" });
});

module.exports = router;
