
/**
 * 商户信息
 */
const BusinessInfoModel = {
    _id: String,
    BusinessName: String,
    BusinessName: String,
    City: String,
    Province: String,
    Area: String,
    CityCode: String,
    ProvinceCode: String,
    AreaCode: String,
    Address: String,
    Lng: String,
    Lat: String,
    Tel: String,
    BusinessTime: String,
    ChannelNo: String,
    ChannelUrl: String,
    Secretkey: String,
    BusinessFunc: [{
        Type: Number,
        Name: String,
        IsOpen: Boolean
    }],
    AuthorFile: String,
    PayConfig: [{
        OpenAPIType: Number,
        PayConfig: {
            MchID: String,
            secret_key: String,
            apiclient_cert: String,
            apiclient_key: String,
            MerchantPubKey: String,
            MerchantPreKey: String,
            AliPayPublicKey: String
        },
    }],
    AuthorInfo: [{
        //_id: String,
        OpenAPIType: Number,
        authorizer_appid: String,
        authorizer_access_token: String,
        expires_in: Number,
        re_expires_in: Number,
        authorizer_refresh_token: String,
        AuthorizationCode: String,
        AuthorizationCodeExpiredTime: Number,
        AppCode: String,
        alias: String,
        principal_name: String,
        service_type_info: String,
        Updated: { type: Number, default: Date.now }
    }],
    OwendBusiness: String,
    OwendMall: String,
    MallCode: String,
    ModuleCode: String,
    BusinessNum: String,
    Version: String,
    VerType: String,
    Updated: { type: Number, default: Date.now },
    IsDelete: { type: Boolean, default: false },
    createDate: { type: Number, default: Date.now }
}


const UserInfoModel = {
    _id: String,
    userNo: String,
    password: String,
    name: String,
    openId: String,
    headUrl: String,
    accesstoken: String,
    expiresin: Number,
    refreshtoken: String,
    IsDelete: { type: Boolean, default: false },
    isEnable: { type: Boolean, default: true },
    createDate: { type: Number, default: Date.now }
}



const SysConfigModel = {
    ConfigType: Number,
    Content: String,
    Updated: { type: Number, default: Date.now },
}

const OrderPayInfoModel = {
    _id: String,
    OrderType: Number,
    LgID: String,
    OpenID: String,
    OrderNo: String,
    AccountNumber: String,
    PayType: Number,
    PayName: String,
    PayNo: String,
    Price: Number,
    AuthorAppid: String,
    MchID: String,
    PayStatus: Number,
    SyncStatus: Number,
    PayInfoSignContent: String,
    PayOrderExtended: String,
    SyncErrors: String,
    SyncNum: Number,
    NextSyncDate: { type: Number, default: Date.now },
    OutOrderNo: String,
    OwendEmployee: String,
    OwendBusiness: String,
    OwendMall: String,
    IsNeedSupplyOrder: { type: Boolean, default: true },
    IsDelete: { type: Boolean, default: false },
    Updated: { type: Number, default: Date.now },
    createDate: { type: Number, default: Date.now }
}

module.exports.BusinessInfoModel = BusinessInfoModel;
module.exports.UserInfoModel = UserInfoModel;
module.exports.SysConfigModel = SysConfigModel;
module.exports.OrderPayInfoModel = OrderPayInfoModel;