
function validate(req, res, next) {
  if (req.session.Info == undefined || req.session.Info == null) {
    baseResponse.Code = 401;
    baseResponse.Message = "未授权";
    return res.status(401).jsonp(baseResponse);
  }
  next();
}

function AccessValidate(req = new Request(), res = new Response(), next) {
  let baseResponse = require('../custommodules/BaseResponse').MallResponse;
  let dbo = require("../DataHandler/DbContext");
  let sdkUtilitys = require("../MallSDK/SDKUtiltiys");


  let TPKey = req.headers["tpkey"];
  let Timestamp = req.headers["timestamp"];
  let BusinessID = req.headers["businessid"];
  let MallID = req.headers["mallid"];
  let reSign = req.headers["sign"];
  const testKey = "testconnection";
  let secretkey = "";
  if (TPKey == testKey) {
    secretkey = testKey;
    next();
  }
  else if ((req.baseUrl + req.path) == "/accessBusiness/") {
    console.log("不验证");
    next();
  }
  else if ((req.baseUrl + req.path) == "/MicroReport/api/v1/MallPush/businessinfo") {
    console.log("不验证");
    next();
  }
  else {
    dbo.businessdb.FindOne({ OwendBusiness: BusinessID, OwendMall: MallID }).then(d => {

      secretkey = d.Secretkey;

      let sign = sdkUtilitys.createSign(req.body, TPKey, Timestamp, secretkey);
      if (sign != reSign) {
        console.log("[99998]验签失败");
        throw new Error("[99998]验签失败");
      }
      let total = Date.now() - Date.parse(Timestamp);
      if (total > 10 * 60 * 1000) {
        console.log("[99997]请求过时");
        throw new Error("[99997]请求过时");
      }
      if (TPKey != testKey) {
        req.body.BusinessID = BusinessID;
        req.body.MallID = MallID;
      }
      next();
    }).catch(err => {
      console.log(err);
      baseResponse.ResponseStatus.ErrorCode = 500;
      baseResponse.ResponseStatus.Message = err.message;
      res.send(baseResponse);
    });
  }

}

function GetHeaders(req) {
  let AccessRequest = {
    BusinessID: String,
    MallID: String
  }
  AccessRequest.BusinessID = req.body.BusinessID;
  AccessRequest.MallID = req.body.MallID;
  return AccessRequest;
}

module.exports.BaseValidate = validate;
module.exports.AccessValidate = AccessValidate;
module.exports.GetHeaders = GetHeaders;