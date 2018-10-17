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
    var obj = [{ name: "123123", avg: 20 }, { name: "abcd", avg: 10 }, { name: "123123", avg: 15 }, { name: "ABCD", avg: 30 }];
    var item = obj.find((value) => {
        return value.name=="123123"&&value.avg>=15;
    });
    console.log(item);
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
