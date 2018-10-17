var utilitys = require("../custommodules/Utilitys");
var dbo = require("../DataHandler/DbContext");
var wesdk = require("../WeChatSDK/weChatAPI");
var config = require('../custommodules/ConfigSite');

class bllUser {
    UserBind(eventKey = String, fromUserName = String, toUser = String) {
        if (utilitys.isEmpty(eventKey) || eventKey.length != 64) {
            console.log("用户没有权限");
            throw new Error("用户没有权限");
        }
        var busid = utilitys.ToGuid(eventKey.substring(0, 32));
        var empId = utilitys.ToGuid(eventKey.substring(eventKey.length - 32, 64));

        dbo.userdb.Find({ OwendBusiness: busid }).then(datas => {
            let empInfo = datas.find((value, index) => {
                return value.OwendEmployee == empId;
            });
            if (empInfo != undefined && empInfo.openid != fromUserName) {
                //"当前员工已被绑定"

                sendMessage(fromUserName, "当前员工已被绑定");
            }

            empInfo = datas.find((value, index) => {
                return value.openId == fromUserName
            });
            if (empInfo != undefined && empInfo.OwendEmployee != empId) {
                sendMessage(fromUserName, "当前微信号已绑定该门店");
            }
            else if (empInfo == undefined || empInfo == null) {
                return dbo.userdb.Save(fromUserName);
            }
            else {
                return dbo.userdb.Update(empInfo, { _id: empInfo._id });
            }

        }).then(data => {
            return dbo.businessdb.FindOne({ OwendBusiness: busid });
        }).then(data => {
            let url = config.Domain + "/MicroReport/WeChat/Index";
            sendMessage(fromUserName, `门店绑定成功\n你已成功绑定门店:${data.BusinessName}\n<a href=\"${url}\">点击查看手机报表》</a>`);

        }).catch(err => {
            console.error(err);
        })
    }
}

function sendMessage(touser, content) {
    dbo.sysConfigdb.GetAccessToken().then(d => {
        var jobj = JSON.parse(d);
        wesdk.apisendMessage(jobj.access_token, touser, content);
    }).catch(err => {
        console.log(err);
    });

}

module.exports = new bllUser;