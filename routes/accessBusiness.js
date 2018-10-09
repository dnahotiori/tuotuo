var express = require('express');
var router = express.Router();
var utilitys = require('../custommodules/Utilitys');
var dbo = require("../DataHandler/DbContext");
var businessInfo = require('../DataHandler/dbModel').BusinessInfoModel;
var baseResponse = require('../custommodules/BaseResponse').BaseResponse;
var costPara = require('../custommodules/constPara');
var config = require("../custommodules/ConfigSite");
var validation = require("../custommodules/validationHandler");


router.post('/', function (req, res, next) {
  for (var o in businessInfo) {
    businessInfo[o] = req.body[o];
  }
  businessInfo.AuthorFile = utilitys.Base64Decrypt(req.body.AuthorFile);

  let businessFunc = utilitys.Base64Decrypt(req.body.BusinessFunc);
  let wxConfig = utilitys.Base64Decrypt(req.body.PayConfig);
  let aliConifg = utilitys.Base64Decrypt(req.body.AliPayConfig);

  businessInfo.PayConfig = [];
  businessInfo.BusinessFunc = [];
  if (!utilitys.isEmpty(wxConfig)) {
    let jsonData = JSON.parse(wxConfig);
    businessInfo.PayConfig.push({
      OpenAPIType: costPara.AUTHOR_WX, PayConfig: {
        MchID: jsonData.MchID,
        apiclient_cert: jsonData.apiclient_cert,
        MerchantPreKey: jsonData.MerchantPreKey,
        MerchantPubKey: jsonData.MerchantPubKey,
        AliPayPublicKey: jsonData.AliPayPublicKey,
        secret_key: jsonData.secret_key,
        apiclient_key: jsonData.apiclient_key,
      }
    });
  }
  if (!utilitys.isEmpty(aliConifg)) {
    let jsonData = JSON.parse(aliConifg);
    businessInfo.PayConfig.push({
      OpenAPIType: costPara.AUTHOR_ALIPAY, PayConfig: {
        MchID: jsonData.MchID,
        apiclient_cert: jsonData.apiclient_cert,
        MerchantPreKey: jsonData.MerchantPreKey,
        MerchantPubKey: jsonData.MerchantPubKey,
        AliPayPublicKey: jsonData.AliPayPublicKey,
        secret_key: jsonData.secret_key,
        apiclient_key: jsonData.apiclient_key,
      }
    });
  }
  if (!utilitys.isEmpty(businessFunc)) {
    var jsonObj = JSON.parse(businessFunc);
    jsonObj.forEach(item => {
      businessInfo.BusinessFunc.push(item);
    });
  }

  //console.log(businessInfo);

  dbo.businessdb.Save(businessInfo).then(d => {

  }).catch(err => {
    console.error(err);
  });
  baseResponse.Code = "0";
  res.contentType = "application/json";
  res.send(baseResponse);
});

router.post("/AuthorizationInfo", function (req, res, next) {
  res.contentType = "application/json";
  let resModel = {
    IsAuthor: { type: Boolean, default: true },
    WXNo: String,
    PublicSignaName: String,
    PublicSignaType: String,
    MemberUrl: String,
    WxPayAuthUrl: String,
    WxDomain: String
  }

  var accessInfo = new validation.GetHeaders(req);

  dbo.businessdb.FindOne({ OwendBusiness: accessInfo.BusinessID }).then(d => {
    let authorInfo = businessInfo.AuthorInfo[0];
    let apiType = req.body.ApiType;
    authorInfo = d.AuthorInfo.forEach(item => {
      if (item.OpenAPIType == apiType) {
        return item;
      }
    });

    if (authorInfo == null) {
      resModel.IsAuthor = false;
    }
    else if (authorInfo != null && apiType == costPara.AUTHOR_WX) {
      resModel.WXNo = authorInfo.alias;
      resModel.PublicSignaName = authorInfo.principal_name;
      resModel.PublicSignaType = authorInfo.service_type_info == "0" ? "订阅号" : authorInfo.service_type_info == "1" ? "由历史老帐号升级后的订阅号" : "服务号";
      resModel.MemberUrl = `${config.Domain}/wechat/?AppID=${authorInfo.authorizer_appid}`;
      resModel.WxPayAuthUrl = `http://${config.Domain}/pages/v1/#/`
      resModel.WxDomain = config.Domain;
    }
    else if (apiType == costPara.AUTHOR_ALIPAY) {
      resModel.MemberUrl = `${config.Domain}/alipay/?AppID=${authorInfo.authorizer_appid}`;
    }


    res.send(resModel);
  }).catch(err => {
    console.error(err);
    baseResponse.Code = "9999";
    baseResponse.Message = err;
    res.send(baseResponse);
  });

});

router.post("/CancelAuhtor", function (req, res, next) {
  res.contentType = "application/json";
  let accessInfo = new validation.GetHeaders(req);
  let apiType = req.body.ApiType;
  dbo.businessdb.CancelAuhtor(accessInfo.BusinessID, apiType);

  baseResponse.Code = "0";
  res.send(baseResponse);
});


module.exports = router;
