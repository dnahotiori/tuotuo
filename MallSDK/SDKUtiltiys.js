var crypto = require("crypto");
class SDKUtilitys {
    constructor() {

    }
    createSign(body = JSON, TPKey = String, Timestamp = String, secretkey = String) {
        var paramMap = {};
        var myUtitlis = new _SDKUtilitys();
        myUtitlis.handlerMap(body, paramMap);
        paramMap["tpkey"] = TPKey;
        paramMap["timestamp"] = Timestamp;
        paramMap["secretkey"] = secretkey;
        console.log(paramMap);
        var sign = myUtitlis.GenerateSign(paramMap);
        return sign;
    }
}

class _SDKUtilitys {
    constructor() { }

    handlerMap(body = JSON, paramMap = {}, prex = "") {

        for (var key in body) {
            var jvalue = body[key];
            if (Array.isArray(jvalue)) {
                for (var i = 0; i < jvalue.length; i++) {
                    let item = jvalue[i];
                    var kprex = this.GetKey(`${key}_${i}`, prex);
                    if (typeof (item) === "object") {
                        this.handlerMap(item, paramMap, kprex);
                    }
                    else {
                        paramMap[kprex] = item;
                    }
                }
            }
            else if (typeof (jvalue) === "object") {
                this.handlerMap(jvalue, paramMap, this.GetKey(key, prex));
            }
            else {
                paramMap[this.GetKey(key, prex)] = jvalue;
            }

        }
        return paramMap;
    }

    GetKey(key = String, prex = String) {
        return ((prex == "" || prex == undefined || prex == null ? "" : (prex + "_")) + key).toLowerCase();
    }

    GetMD5(body = String) {
        var md5 = crypto.createHash("md5");
        md5.update(body, 'utf-8');
        var str = md5.digest('hex');
        var s = str.toUpperCase();
        return s;
    }

    dicSort(param = {}) {
        var sortParam = {};
        for (let key of Object.keys(param).sort()) {
            sortParam[key] = param[key];
        }
        return sortParam;
    }

    GenerateSign(param = {}, secretkeyName = "secretkey") {
        try {
            if (param == {} || param == null || secretkeyName == null) return "";

            //排序字典
            var dict = this.dicSort(param);

            // 2.将参数名和参数值组成字符串，将secretkey加到字符串前后
            var vsecret = dict[secretkeyName.toLowerCase()];
            var str = "";
            // sb.Append(vsecret); //将secretkey加到字符串前后
            for (let item in dict) {
                if (item != secretkeyName.toLowerCase()) {
                    str += item;
                    str += dict[item];
                }
            }
            
            str += vsecret;
            str = str.toLowerCase();

            // 3.用MD5算法生成签名
            var signResult = this.GetMD5(str);

            return signResult;
        }
        catch (err) {
            console.log(`生成SIGN错误：${err}`);
            return "";
        }
    }
}


module.exports = new SDKUtilitys();