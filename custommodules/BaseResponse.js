var BaseResponse = { ErrorCode: Number, Message: String };
var MallResponse = { ResponseStatus: { ErrorCode: 0, Message: String } };
var SessionInfo = { openId: String, accessToken: String }

module.exports.BaseResponse = BaseResponse;
module.exports.SessionInfo = SessionInfo;
module.exports.MallResponse = MallResponse;