var express = require('express');
var router = express.Router();
//var mallSdkUtilitys = require("../MallSDK/SDKUtiltiys");
var mallsdkAPi = require("../MallSDK/RequestAPI");
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
    var mallsdk = new mallsdkAPi("http://192.168.1.153:9999");
    mallsdk.TestConnectionRequest({});
    return res.render("index", { title: apiModel.OwnedBusiness });
});

module.exports = router;
