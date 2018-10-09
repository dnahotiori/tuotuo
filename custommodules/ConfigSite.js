"use strict";
var fs = require("fs");

var config = {
    AliPayAppID: String,
    AppPublicFile: String,
    AppPrivateFile: String,
    AliPayPublicFile: String,
    MongodbConnectionString: String,
    DataName: String,
    WXAppID: String,
    WXAppSecret: String,
    WXEncodingAESKey: String,
    WXToken: String,
    Domain: String,
    //publicNoID: String,
}


class ConfigSite {
    constructor() {
        var str = fs.readFileSync("./appConfig.json", "utf-8");
        var jsonObject = JSON.parse(str);
        config.AliPayAppID = jsonObject.AliPayAppID;
        config.AliPayPublicFile = jsonObject.AliPayPublicFile;
        config.AppPrivateFile = jsonObject.AppPrivateFile;
        config.AppPublicFile = jsonObject.AppPublicFile;
        config.MongodbConnectionString = jsonObject.MongodbConnectionString;
        config.DataName = jsonObject.DataName;
        config.WXAppID = jsonObject.WXAppID;
        config.WXAppSecret = jsonObject.WXAppSecret;
        config.WXToken = jsonObject.WXToken;
        config.WXEncodingAESKey = jsonObject.WXEncodingAESKey;
        config.Domain = jsonObject.Domain;
       // config.publicNoID = jsonObject.publicNoID;
    }

    get AliPayAppID() {
        return config.AliPayAppID;
    }

    get AliPayPublicFile() {
        return config.AliPayPublicFile;
    }

    get AppPrivateFile() {
        return config.AppPrivateFile;
    }


    get AppPublicFile() {
        return config.AppPublicFile;
    }

    get MongodbConnectionString() {
        return config.MongodbConnectionString;
    }

    get DataName() {
        return config.DataName;
    }

    get WXAppID() {
        return config.WXAppID;
    }

    get WXAppSecret() {
        return config.WXAppSecret;
    }

    get WXToken() {
        return config.WXToken;
    }

    get WXEncodingAESKey() {
        return config.WXEncodingAESKey;
    }

    get Domain() {
        return config.Domain;
    }
    // get publicNoID() {
    //     return config.publicNoID;
    // }
}

module.exports = new ConfigSite();