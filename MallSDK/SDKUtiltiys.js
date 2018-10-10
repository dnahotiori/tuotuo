var crypto = require("crypto");
class SDKUtilitys {
    constructor() {

    }
    createSign(body = JSON, TPKey = String, Timestamp = String, secretkey = String) {
        var paramMap = new Map();
        var myUtitlis = new _SDKUtilitys();
        myUtitlis.handlerMap(body, paramMap);
        paramMap.set("tpkey", TPKey);
        paramMap.set("timestamp", Timestamp);
        paramMap.set("secretkey", secretkey);
        console.log(paramMap);
        var sign = myUtitlis.GenerateSign(paramMap);
        return sign;
    }
}

class _SDKUtilitys {
    constructor() { }

    handlerMap(body = JSON, paramMap = Map, prex = "") {

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
                        paramMap.set(kprex, item);
                    }
                }
            }
            else if (typeof (jvalue) === "object") {
                this.handlerMap(jvalue, paramMap, this.GetKey(key, prex));
            }
            else {
                paramMap.set(this.GetKey(key, prex), jvalue);
            }

        }
        return paramMap;
    }

    GetKey(key = String, prex = String) {
        return ((prex == "" || prex == undefined || prex == null ? "" : (prex + "_")) + key).toLowerCase();
    }

    GetMD5(body = String) {
        var md5 = crypto.createHash("md5");
        md5.update(body);
        var str = md5.digest('hex');
        var s = str.toUpperCase();
        return s;
    }

    dicSort(param = Map) {
        var sortParam = new Map();

        for (let key of Object.keys(param).sort()) {
            sortParam.set(key, param[key]);
        }
        return sortParam;
    }

    GenerateSign(param = Map, secretkeyName = "secretkey") {
        try {
            if (param == null || secretkeyName == null) return "";

            //排序字典
            var dict = this.dicSort(param);

            // 2.将参数名和参数值组成字符串，将secretkey加到字符串前后
            var vsecret = dict[secretkeyName.toLowerCase()];
            var str = "";
            // sb.Append(vsecret); //将secretkey加到字符串前后
            dict.forEach(item => {
                if (item != secretkeyName.toLowerCase()) {
                    str += item;
                    str += dict[item];
                }
            });
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