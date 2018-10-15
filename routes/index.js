var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
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
        "MallID": "6bb95f7d-1de5-4f07-baaa-a907011725e8",
        "BusinessID": "abd54e33-9013-46b6-9dff-a907011cb620",
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
    //res.redirect("/Home/dowloand")
    res.render("index", { title: "WelCome" });
});

router.get("/dowloand", function (req, res, next) {
    //let referer= req.headers.referer;
    
    console.log(req);
    res.send(req.header);
    // res.end();
    // var filePath = path.join(__dirname, '../AliPayKey/2017080208002578_alipay_public_key.pem');
    // var stats = fs.statSync(filePath);
    // res.set({
    //     'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
    //     'Content-Disposition': 'attachment; filename=2017080208002578_alipay_public_key.pem', //告诉浏览器这是一个需要下载的文件
    //     'Content-Length': stats.size  //文件大小
    // });
    // fs.createReadStream(filePath).pipe(res);
});

module.exports = router;
