function BaseResponse() {
    return { ErrorCode: Number, Message: String };
}

function SessionInfo() {
    return { openId: String, accessToken: String };
}
function MallResponse() {
    return { ResponseStatus: { ErrorCode: 0, Message: String } };
}
module.exports.BaseResponse = BaseResponse;
module.exports.SessionInfo = SessionInfo;
module.exports.MallResponse = MallResponse;