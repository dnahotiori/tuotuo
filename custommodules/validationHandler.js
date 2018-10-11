
function validate(req, res, next) {
  if (req.session.Info == undefined || req.session.Info == null) {
    baseResponse.Code = 401;
    baseResponse.Message = "未授权";
    return res.status(401).jsonp(baseResponse);
  }
  next();
}

function AccessValidate(req = new Request(), res = new Response(), next) {
  let baseResponse = require('../custommodules/BaseResponse').BaseResponse;
  let dbo = require("../DataHandler/DbContext");
  let sdkUtilitys = require("../MallSDK/SDKUtiltiys");


  let TPKey = req.headers["tpkey"];
  let Timestamp = req.headers["timestamp"];
  let BusinessID = req.headers["businessid"];
  let MallID = req.headers["mallid"];
  let reSign = req.headers["sign"];
  let testKey = "testconnection";
  let secretkey = "";
  if (TPKey == testKey) {
    secretkey = testKey;
  }
  else if ((req.baseUrl + req.path) == "/accessBusiness/") {
    console.log("不验证");
  }
  else {
    dbo.businessdb.FindOne({ OwendBusiness: BusinessID, OwendMall: MallID }).then(d => {

      secretkey = d.Secretkey;

      let sign = sdkUtilitys.createSign(req.body, TPKey, Timestamp, secretkey);
      if (sign != reSign) {
        throw new Error("[99998]验签失败");
      }
      let total = Date.now() - Date.parse(Timestamp);
      if (total > 10 * 60 * 1000) {
        throw new Error("[99997]请求过时");
      }
      if (TPKey != testkey) {
        req.body.BusinessID = BusinessID;
        req.body.MallID = MallID;
      }
      next();
    }).catch(err => {
      console.log(err);
      baseResponse.Code = 500;
      baseResponse.Message = err.message;
      return res.status(500).jsonp(baseResponse);
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