var sdkHttp = require("./SDKHttp");
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

class SDKRequestAPI {
    constructor(host = "http://****") {
        this.host = host;
    }

    TestConnectionRequest(request = testConnectionRequestCOnfig) {
        let url = "/MicroReport/internal/v1/MicroReportSet/Reporttestcallback";
        url = this.host + url;
        return startAPI(url, request);
    }

    MallUserStateRequest(request = mallUserStateRequestConfig) {
        let url = "/MicroReport/internal/v1/BindWXUser/GetMallUserState";
        url = this.host + url;
        return startAPI(url, request);
    }

    MallAuthorRequest(request = mallAuthorRequestConfig) {
        let url = "http://cardreader.youcaihua.net:8081/ExtendApi/GetAuthBizCount";
        return startAPI(url, request);
    }

    GetRptBusinessDetailRequest(request = getRptBusinessDetailRequestConfig) {
        let url = "/MicroReport/internal/v1/MicroReportQuery/GetRptBusinessDetail";
        url = this.host + url;
        return startAPI(url, request);
    }


    /**
     * 查询门店的基础收入数据
     * @param {*} reques 
     */
    GetHomeDataFromMallRequest(request = getHomeDataFromMallRequestConfig) {
        let url = "/MicroReport/internal/v1/MicroReportQuery/GetHomeDataFromMall";
        url = this.host + url;
        return startAPI(url, request);
    }

    BackTodayIncomeDataRequest(request = backTodayIncomeDataRequestConfig) {
        let url = "/MicroReport/internal/v1/MicroReportQuery/GetTodayIncomeData";
        url = this.host + url;
        return startAPI(url, request);
    }
}

function startAPI(url, request, mothed = "POST") {
    if (mothed == "POST") {
        return sdkHttp.HttpPOST(url, request);
    }
}

module.exports = SDKRequestAPI;