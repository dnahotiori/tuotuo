var fs = require("fs");
var config = require("../custommodules/ConfigSite");
var webHttps = require("./WebHttps")
var urlencode = require('urlencode');

const openApiUrl = "https://api.weixin.qq.com";
class weChatAPI {
    constructor() {

    }
    /**
     * 返回用户授权地址
     * @param {回调地址} redirect_uri 
     * @param {需要传递的参数} state 
     */
    authorizeUrl(redirect_uri, state) {
        redirect_uri = urlencode.encode(config.Domain + redirect_uri);
        if (state == undefined) {
            state = "";
        }
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.WXAppID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    }

    /**
     * 通过CODE 换取用户Token
     * @param {用户COde} code 
     */
    authorizeToken(code) {
        var apiUrl = `${openApiUrl}/sns/oauth2/access_token?appid=${config.WXAppID}&secret=${config.WXAppSecret}&code=${code}&grant_type=authorization_code`;
        return webHttps.HttpPOST(apiUrl, "");
    }

    /**
     * 获取用户信息
     * @param {*} access_token 
     * @param {*} openId 
     */
    authorizeUserInfo(access_token, openId) {
        var apiUrl = `${openApiUrl}/sns/userinfo?access_token=${access_token}&openid=${openId}&lang=zh_CN`;
        return webHttps.HttpGet(apiUrl);
    }
    /**
     * 获取AccessToken
     */
    apiAccessToken() {
        var apiUrl = `${openApiUrl}/cgi-bin/token?grant_type=client_credential&appid=${config.WXAppID}&secret=${config.WXAppSecret}`;
        return webHttps.HttpGet(apiUrl);
    }

    /**
     * 获取第三方Token
     * @param {*} component_verify_ticket 
     */
    apiComponentToken(component_verify_ticket) {
        var apiUrl = `${openApiUrl}/cgi-bin/component/api_component_token`;
        return webHttps.HttpPOST(apiUrl, {
            "component_appid": config.WXAppID,
            "component_appsecret": config.WXAppSecret,
            "component_verify_ticket": component_verify_ticket
        });
    }
    /**
     * 获取第三方预受码
     * @param {*} component_access_token 
     */
    preAuthCode(component_access_token) {
        var apiUrl = `${openApiUrl}/cgi-bin/component/api_create_preauthcode?component_access_token=${component_access_token}`;
        return webHttps.HttpPOST(apiUrl, { component_appid: config.WXAppID });

    }

    /**
     * 获取公众号授权二维码
     * @param {*} pre_auth_code 
     * @param {*} redirect_uri 
     */
    componentloginpage(pre_auth_code, redirect_uri) {
        redirect_uri = urlencode.encode(config.Domain + redirect_uri);
        return `https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=${config.WXAppID}&pre_auth_code=${pre_auth_code}&redirect_uri=${redirect_uri}&auth_type=3`
    }

    /**
     * 使用授权码换取公众号或小程序的接口调用凭据和授权信息
     * @param {*} component_access_token 
     * @param {*} authorization_code 
     */
    apiQueryAuth(component_access_token, authorization_code) {
        let apiUrl = `${openApiUrl}/cgi-bin/component/api_query_auth?component_access_token=${component_access_token}`
        return webHttps.HttpPOST(apiUrl, {
            "component_appid": config.WXAppID,
            "authorization_code": authorization_code
        });
    }

    apicreateQrCode(access_token = String, scene_str = String) {
        let apiUrl = `${openApiUrl}/cgi-bin/qrcode/create?access_token=${access_token}`
        var post = { "expire_seconds": 604800, "action_name": "QR_SCENE", "action_info": { "scene": { "scene_str": scene_str } } };
        return webHttps.HttpPOST(apiUrl, post);
    }

    apishowqrcode(ticket) {
        let apiUrl = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`
        return webHttps.HttpGet(apiUrl, null);
    }
}


module.exports = new weChatAPI();