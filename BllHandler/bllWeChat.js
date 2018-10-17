var wechatSdk = require("../WeChatSDK/weChatAPI");
var constPara = require("../custommodules/constPara");
var dbo = require("../DataHandler/DbContext");

class BllweChat {
    constructor() {

    }

    GetWxQRCode(BussId = String, EmpId = String) {
        return dbo.sysConfigdb.FindOne({ "ConfigType": constPara.AccessToken }).then(data => {
            var content = data.Content;
            var jobj = JSON.parse(content);
            var bidStr = BussId.replace(/-/g, "");
            var empStr = EmpId.replace(/-/g, "");
            return wechatSdk.apicreateQrCode(jobj.access_token, bidStr + empStr);
        })
            // .then(data => {
            //     console.log(data);
            //     if (data["errcode"] != undefined && data["errcode"] != 0) {
            //         throw new Error(`[${data.errcode}]${data.errmsg}`);
            //     }
            // })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }
}

module.exports = new BllweChat();