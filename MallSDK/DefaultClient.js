var sdkHttp = require("./SDKHttp");
var sdkUtilitys = require("./SDKUtiltiys");
var AuthorizationInfo = require("./AuthorizationInfo");
var APIRequestBase = require("./APIRequestBase");


class DefaultClient {
    constructor(hostName) {
        this.hostName = hostName;
    }

    Exce(api = new APIRequestBase(), authorInfo = AuthorizationInfo) {
        let headers = {};
        let apiurl = api.Url;

        apiurl = this._CreateUrl(authorInfo.ServerUrl, api.Url);
        if (!api.IsNoSign) {
            let Timestamp = new Date().toLocaleString();
            let sign = sdkUtilitys.createSign(api.RequestBody, authorInfo.TPKey, Timestamp, authorInfo.secretkey);
            headers = {
                TPKey: authorInfo.TPKey,
                Timestamp: Timestamp,
                Sign: sign,
                vpoint: authorInfo.ServerUrl,
                BusinessID: api.RequestBody.BusinessID,
                MallID: api.RequestBody.MallID
            };
        }


        if (api.Mothed == "POST") {
            return sdkHttp.HttpPOST(apiurl, api.RequestBody, headers);
        }
        else {
            return sdkHttp.HttpGet(apiurl, api.RequestBody);
        }
    }

    _CreateUrl(serverUrl = String, url = String) {
        let str = "";
        if (this.hostName == undefined || this.hostName == null || this.hostName == "") {
            str = `http://${serverUrl}${url}`;
        }
        else {
            str = `https://${this.hostName}${url}`;
        }
        return str;
    }

}

module.exports = DefaultClient;