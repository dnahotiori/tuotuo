var express = require('express');
var router = express.Router();
var xmlBody = require("../custommodules/customFilt");
var config = require('../custommodules/ConfigSite');
var bllUser = require("../BllHandler/bllUser");

router.get('/WeChatEvent', function (req, res, next) {

    console.log(req.query);

    var echostr = req.query.echostr;
    var nonce = req.query.nonce;
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;

    res.contentType = "text/html";
    res.send(echostr);
});

router.post('/WeChatEvent', xmlBody.XmlBody, xmlBody.XmlDecrypt, function (req, res, next) {
    console.log(req.query);
    let xmlJson = req.body.xmlJson;
    console.log(xmlJson);
    let dxmlJson = req.body.decryptXmlJson;
    console.log(dxmlJson);

    switch (dxmlJson.xml.Event) {
        case "subscribe":
        case "SCAN":
            bllUser.UserBind(dxmlJson.xml.EventKey, dxmlJson.xml.FromUserName, dxmlJson.xml.ToUserName);
            break;
    }

   // res.contentType = "text/html";
    res.send("");
});



module.exports = router;