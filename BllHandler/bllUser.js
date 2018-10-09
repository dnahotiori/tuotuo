var utilitys = require("../custommodules/Utilitys")
var dbo = require("../DataHandler/DbContext")
class bllUser {
    UserBind(eventKey = "", fromUserName = "") {
        if (utilitys.isEmpty(model.EventKey) || model.EventKey.Length != 64) {
            throw new Error("用户没有权限");
        }
        var busid = eventKey.Substring(0, 32);
        var empId = eventKey.Substring(eventKey.length - 32, 32);
        dbo.userdb.FindOne({ OwendEmployee: empId }).then(d => {
            if (d != null && d.openid != fromUserName) {
                //"当前员工已被绑定"
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