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
        dbo.userdb.Find({ OwendBusiness: busid }).then(datas => {
            let empInfo = datas.find((value, index) => {
                return value.OwendEmployee == empId;
            });
            if (empInfo != undefined && empInfo.openid != fromUserName) {
                //"当前员工已被绑定"
                WeChatMsg.ReplyText(fromUserName, toUser, "当前员工已被绑定");
            }

            empInfo = datas.find((value, index) => {
                return value.openId == fromUserName
            });
            if (empInfo != undefined && empInfo.OwendEmployee != empId) {
                WeChatMsg.ReplyText(fromUserName, toUser, "当前微信号已绑定该门店");
            }
            else if (empInfo == undefined) {
                return dbo.userdb.Save(fromUserName);
            }
            else {
                return dbo.userdb.Update(empInfo, { _id: empInfo._id });
            }

        }).then(data => {
            return dbo.businessdb.FindOne({ "OwendBusiness": busid });
        }).then(data => {
            let url = config.Domain + "/MicroReport/WeChat/Index";
            WeChatMsg.ReplyText(fromUserName, toUser, ` 门店绑定成功\n你已成功绑定门店:${data.BusinessName}\n<a href=\"${url}\">点击查看手机报表》</a>`);
        }).catch(err => {
            console.error(err);
        })
    }
}

module.exports = new bllUser;