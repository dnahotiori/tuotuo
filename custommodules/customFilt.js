var xml2js = require('xml2js');
var wxBizMsgCrypt = require("../WeChatSDK/WXBizMsgCrypt");
var config = require('../custommodules/ConfigSite');
var utilitys = require("../custommodules/Utilitys");

/**
 * 获取提交的XML req.body.xmlJson
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function xmlBody(req, res, next) {
    let buf = '';
    req.on('data', function (chunk) { buf += chunk });
    req.on('end', function () {
        console.log(buf);
        let parseString = xml2js.parseString;
        parseString(buf, { explicitArray: false }, function (err, result) {
            if (err) {
                console.error(err);
            }
            else {
                req.body.xmlJson = result;//JSON.stringify(result);
            }
            next();
        });
    });
}

/**
 * 解密微信xml req.body.decryptXmlJson
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function xmlDecrypt(req, res, next) {
    let xmlJson = req.body.xmlJson;
    var msgCrypt = new wxBizMsgCrypt({
        token: config.WXToken,
        appid: config.WXAppID,
        encodingAESKey: config.WXEncodingAESKey,
        msg_signature: req.query.signature
    });
    let contentXml = msgCrypt.decrypt(xmlJson.xml.Encrypt);

    utilitys.xmlToJson(contentXml).then(d => {
        req.body.decryptXmlJson = d;
        next();
    }).catch(err => {
        console.error(err);
        next();
    })

}


module.exports.XmlBody = xmlBody;
module.exports.XmlDecrypt = xmlDecrypt;