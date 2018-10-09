
function validate(req, res, next) {
  if (req.session.Info == undefined || req.session.Info == null) {
    baseResponse.Code = 401;
    baseResponse.Message = "未授权";
    return res.status(401).jsonp(baseResponse);
  }
  next();
}

function AccessValidate(req, res, next) {
  next();
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