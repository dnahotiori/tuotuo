var wxBizMsgCrypt = require("../WeChatSDK/WXBizMsgCrypt");
var config = require("../custommodules/ConfigSite");
var utilitys = require("../custommodules/Utilitys");
class wechatMessage {
    constructor() {

    }
    ReplyText(toUser = String, fromUser = String, content = String) {
        var createTime = Date.now();
        var xml = `<xml><ToUserName><![CDATA[${toUser}]]></ToUserName><FromUserName><![CDATA[${fromUser}]]></FromUserName> <CreateTime>${createTime}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`

        var msgCrypt = new wxBizMsgCrypt({ token: config.WXToken, appid: config.WXAppID, encodingAESKey: config.WXEncodingAESKey });
        var eMessage = msgCrypt.encrypt(xml);
        var sign = utilitys.NewGuid().replace(/-/g, "");
        var nonce = utilitys.CreateRandom();
        var resXml = `<xml><Encrypt><![CDATA[${eMessage}]]></Encrypt><MsgSignature>${sign}</MsgSignature><TimeStamp>${createTime}</TimeStamp><Nonce>${nonce}</Nonce></xml>`
        return resXml;
    }

}
module.exports = new wechatMessage();