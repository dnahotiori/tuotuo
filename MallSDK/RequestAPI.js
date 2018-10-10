var sdkHttp = require("./SDKHttp");
var sdkUtilitys = require("./SDKUtiltiys");
var AuthorizationInfo = require("./AuthorizationInfo");
var client = require("./DefaultClient");
var APIRequestBase = require("./APIRequestBase");

var testConnectionRequestCOnfig = {
    OwnedBusiness: String,
    BusinessID: String,
    MallID: String
}

var mallUserStateRequestConfig = {
    EmpID: String,
    BusinessID: String,
    MallID: String
}

var mallAuthorRequestConfig = {
    mallCode: String,
    moduleCode: String,
    BusinessID: String,
    MallID: String
}

var getRptBusinessDetailRequestConfig = {
    StartPeriod: Date,
    EndPeriod: Date,
    QueryChannelPeriod: { Date: Date },
    QueryCashPeriod: { Date: Date },
    QueryLgPeriod: { Date: Date },
    QueryGamePeriod: { Date: Date },
    QueryScanPeriod: { Date: Date },
    QueryGoodsPeriod: { Date: Date },
    IsQueryTotady: Boolean,
    IsQueryChannelIncome: Boolean,
    IsQueryCashIncome: Boolean,
    IsQueryMchineScan: Boolean,
    IsQueryLg: Boolean,
    IsQueryGoods: Boolean,
    IsQueryGame: Boolean,
    BusinessID: String,
    MallID: String
}

var getHomeDataFromMallRequestConfig = {
    IsQueryTodayIncome: Boolean,
    IsQueryChannel: Boolean,
    IsQueryMachineScan: Boolean,
    IsQueryCashFinish: Boolean,
    BusinessID: String,
    MallID: String
}

var backTodayIncomeDataRequestConfig = {
    BusinessID: String,
    MallID: String
}


class APITestConnectionRequest extends APIRequestBase {
    constructor(request = testConnectionRequestCOnfig) {
        super({
            url: "/MicroReport/internal/v1/MicroReportSet/Reporttestcallback",
            body: request,
            isNoSign: true
        });
    }
}


class APIMallAuthorRequest extends APIRequestBase {
    constructor(request = mallAuthorRequestConfig) {
        super({
            url: "http://cardreader.youcaihua.net:8081/ExtendApi/GetAuthBizCount",
            body: request,
            isNoSign: true
        });
    }
}

class APIMallUserStateRequest extends APIRequestBase {
    constructor(request = mallUserStateRequestConfig) {
        super({
            url: "/MicroReport/internal/v1/BindWXUser/GetMallUserState",
            body: request,
        });
    }
}

class APIGetRptBusinessDetailRequest extends APIRequestBase {
    constructor(request = getRptBusinessDetailRequestConfig) {
        super({
            url: "/MicroReport/internal/v1/MicroReportQuery/GetRptBusinessDetail",
            body: request,
        });
    }
}

class APIGetHomeDataFromMallRequest extends APIRequestBase {
    constructor(request = getHomeDataFromMallRequestConfig) {
        super({
            url: "/MicroReport/internal/v1/MicroReportQuery/GetHomeDataFromMall",
            body: request,
        });
    }
}

class APIBackTodayIncomeDataRequest extends APIRequestBase {
    constructor(request = backTodayIncomeDataRequestConfig) {
        super({
            url: "/MicroReport/internal/v1/MicroReportQuery/GetTodayIncomeData",
            body: request,
        });
    }
}

module.exports.APITestConnectionRequest = APITestConnectionRequest;
module.exports.APIBackTodayIncomeDataRequest = APIBackTodayIncomeDataRequest;
module.exports.APIGetHomeDataFromMallRequest = APIGetHomeDataFromMallRequest;
module.exports.APIGetRptBusinessDetailRequest = APIGetRptBusinessDetailRequest;
module.exports.APIMallAuthorRequest = APIMallAuthorRequest;
module.exports.APIMallUserStateRequest = APIMallUserStateRequest;
module.exports.APITestConnectionRequest = APITestConnectionRequest;