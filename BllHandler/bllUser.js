var utilitys = require("../custommodules/Utilitys");
var dbo = require("../DataHandler/DbContext");
var WeChatMsg = require("../WeChatSDK/wechatMessage");
var config = require('../custommodules/ConfigSite');

class bllUser {
    UserBind(eventKey = String, fromUserName = String, toUser = String) {
        if (utilitys.isEmpty(model.EventKey) || model.EventKey.Length != 64) {
            throw new Error("用户没有权限");
        }
        var busid = eventKey.Substring(0, 32);
        var empId = eventKey.Substring(eventKey.length - 32, 32);
        dbo.userdb.FindOne({ OwendEmployee: empId }).then(d => {
            if (d != null && d.openid != fromUserName) {
                //"当前员工已被绑定"
                WeChatMsg.ReplyText(fromUserName, toUser, "当前员工已被绑定");
            }

            if (d != null) {

            }
            else {

            }

        }).catch(err => {
            console.error(err);
        })
    }
}

module.exports = new bllUser;