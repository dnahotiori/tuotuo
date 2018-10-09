var dbo = require('../DataHandler/DbContext');
var weChatAPi = require("../WeChatSDK/weChatAPI");
var constPara = require("../custommodules/constPara");
class WeChatTask {
    RefreshComponentToken() {
        let ticket = "";
        dbo.sysConfigdb.FindOne({ ConfigType: constPara.ComponentVerifyTicket })
            .then(d => {
                if (d == null) {
                    console.log("Ticket为空此次刷新Token失败");
                    throw new Error("Ticket为空此次刷新Token失败");
                }
                ticket = d.Content;
                return dbo.sysConfigdb.FindOne({ ConfigType: constPara.ComponentAccessToken });

            }).then(d => {
                if (d == null) {
                    return weChatAPi.apiComponentToken(ticket);
                }

                let tokenInfo = JSON.parse(d.Content);
                if ((d.Updated + tokenInfo.component_verify_ticket) <= (Date.now() - 30 * 60 * 1000)) {
                    return weChatAPi.apiComponentToken(ticket);
                }
                console.log("TOken未失效");
            })
            .then(d => {
                if (d.errcode == 0) {
                    return dbo.sysConfigdb.Save(constPara.ComponentAccessToken, d.ToString());
                }
                else {
                    throw new Error(`[${d.errcode}]${d.errmsg}`);
                }
            }).catch(err => {
                console.error(err);
            });
    }

    RefreshAccessToken() {
        dbo.sysConfigdb.FindOne({ ConfigType: constPara.AccessToken })
            .then(d => {
                if (d == null) {
                    return weChatAPi.apiAccessToken();
                }
                let tokenInfo = JSON.parse(d.Content);
                if ((d.Updated + tokenInfo.expires_in) <= (Date.now() - 30 * 60 * 1000)) {
                    return weChatAPi.apiAccessToken();
                }
                console.log("TOken未失效");
            }).then(d => {
                if (d != null) {
                    if (d.errcode == undefined || d.errcode == 0) {
                        return dbo.sysConfigdb.Save(constPara.AccessToken, d);
                    }
                    else {
                        throw new Error(`[${d.errcode}]${d.errmsg}`);
                    }
                }
            }).catch(err => {
                console.error(err);
            });
    }
}

module.exports = new WeChatTask();