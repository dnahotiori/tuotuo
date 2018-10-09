var xml2js = require("xml2js");
function Utilitys() {

}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

Utilitys.NewGuid = function () {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

Utilitys.Base64Decrypt = function (str) {
    if (str == undefined || str == null || str == "") {
        return "";
    }
    try {
        var b = new Buffer(str, "base64");
        return b.toString();
    }
    catch (er) {
        console.error(er);
    }
    return "";
}

Utilitys.Base64Encrypt = function (str) {
    if (str == undefined || str == null || str == "") {
        return "";
    }
    try {
        var b = new Buffer(str);
        return b.toString("base64");
    }
    catch (e) {
        console.error(e);
    }
    return "";
}
Utilitys.MapTo = function (soucre, target) {
    for (var o in target) {
        target[o] = soucre[o];
    }
}

Utilitys.isEmpty = function (obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

Utilitys.xmlToJson = function (xml) {
    let parseString = xml2js.parseString;
    let xmlPromise = new Promise(function (resolve, reject) {
        parseString(xml, { explicitArray: false }, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
                //return result;//JSON.stringify(result);
            }
        });
    });
    return xmlPromise;
}

Utilitys.CreateRandom = function (n = 0) {
    if (n == undefined || n < 0) {
        n = 100000
    }
    return Math.ceil(Math.random() * 100000)
}
module.exports = Utilitys;