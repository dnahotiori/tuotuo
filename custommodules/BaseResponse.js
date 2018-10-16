var BaseResponse = { ErrorCode: Number, Message: String };
var MallResponse = { ResponseStatus: { ErrorCode: Number, Message: String } };

var SessionInfo = { openId: String, accessToken: String }

module.exports.BaseResponse = BaseResponse;
module.exports.SessionInfo = SessionInfo;
module.exports.MallResponse = MallResponse;