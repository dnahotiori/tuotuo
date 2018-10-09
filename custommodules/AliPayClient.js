"use strict";
var fs = require("fs");
var AliPaySdk = require('alipay-sdk').default;
var config = require("../custommodules/configSite");
var urlencode = require('urlencode');

function AliPayClient() {

}

var alipaySdk = new AliPaySdk({
    appId: config.AliPayAppID,
    privateKey: fs.readFileSync("./AliPayKey/" + config.AppPrivateFile, "ascii"),
    alipayPublicKey: fs.readFileSync("./AliPayKey/" + config.AliPayPublicFile, "ascii")
});
AliPayClient.Client = function () {

    return alipaySdk;
}

AliPayClient.GetAuthorizeUserInfo = function (app_id, auth_code) {
    return alipaySdk.exec("alipay.system.oauth.token", {
        app_id: app_id,
        code: auth_code
    }).then(d => {
        return alipaySdk.exec("alipay.user.info.share", {
            app_id: app_id,
            code: auth_code
        });
    }).catch(err => {
        console.log(err);
    });
}

AliPayClient.PublicAppAuthorizeUrl = function (appId, redirectUri, state) {
    redirectUri = urlencode.encode(config.Domain + redirectUri);
    let url = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${appId}&scope=auth_user,auth_base&redirect_uri=${redirectUri}&state=${state}`
    return url;
}

module.exports = AliPayClient;