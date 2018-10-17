const mongoose = require("./baseDb");
const utitliys = require("../custommodules/Utilitys");
const dbmodel = require('../DataHandler/dbModel');
const constPara = require("../custommodules/constPara");

const userSchema = mongoose.Schema(dbmodel.UserInfoModel);
const businessInfoSchema = mongoose.Schema(dbmodel.BusinessInfoModel);
const sysConfigSchema = mongoose.Schema(dbmodel.SysConfigModel);

class DbContext {

    constructor(cSchema, tableName = "") {
        this.mongooseObj = mongoose.model(tableName, cSchema);
    }

    Add(doc = {}) {
        //doc._id = utitliys.NewGuid();
        //doc.IsDelete = false;
        return this.mongooseObj.insertMany(doc);
    }
    Find(conditions = {}) {
        // if (!conditions.hasOwnProperty("IsDelete")) {
        //     conditions.IsDelete = false;
        // }
        let query = this.mongooseObj.find(conditions);
        return query.exec();
    }
    FindOne(conditions = {}) {
        // if (!conditions.hasOwnProperty("IsDelete")) {
        //     conditions.IsDelete = false;
        // }
        let query = this.mongooseObj.findOne(conditions);
        return query.exec();
    }
    Update(doc = {}, conditions = {}) {
        let query = this.mongooseObj.updateOne(conditions, doc);
        return query.exec();
    }
    Delete(Id = "") {
        let query = this.mongooseObj.updateOne({ _id: Id }, { IsDelete: true });
        return query.exec();
    }
    Remove(Id = "") {
        let query = this.mongooseObj.deleteOne({ _id: Id });
        return query.exec();
    }
}

class UserDbContext extends DbContext {
    constructor() {
        super(userSchema, "o_UserInfo");
    }

    Save(data = dbmodel.UserInfoModel) {

        let info = Object.assign({}, {}, data);
        return this.FindOne({
            openId: info.openid,
            OwendBusiness: info.OwendBusiness,
            OwendMall: info.OwendMall,
            OwendEmployee: info.OwendEmployee
        }).then(r => {
            if (r == null) {
                return this.Add({
                    openId: info.openid,
                    accesstoken: info.accesstoken,
                    expiresin: info.expiresin,
                    refreshtoken: info.refreshtoken,
                    name: info.name,
                    headUrl: info.headUrl,
                    OwendBusiness: info.OwendBusiness,
                    OwendMall: info.OwendMall,
                    OwendEmployee: info.OwendEmployee,
                });
            }
            else {
                return this.Update({
                    accesstoken: accesstoken,
                    expiresin: expiresin,
                    refreshtoken: refreshtoken,
                    name: name,
                    headUrl: headUrl
                }, { openId: openid })
            }
        }).catch(err => {
            console.log(err);
        });
    }
}

class BussinessInfoDbContext extends DbContext {
    constructor() {
        super(businessInfoSchema, "o_BusinessInfo");
    }
    Save(model = dbmodel.BusinessInfoModel) {

        return this.FindOne({ OwendBusiness: model.OwendBusiness, IsDelete: false }).then(d => {
            if (d == null) {
                model._id = utitliys.NewGuid();
                return this.Add(model);
            }
            else {
                d.BusinessFunc = model.BusinessFunc;
                d.PayConfig = model.PayConfig;
                //d.AuthorInfo = model.AuthorInfo;
                d.BusinessName = model.BusinessName;
                d.City = model.City;
                d.Province = model.Province;
                d.Area = model.Area;
                d.Address = model.Address;
                d.BusinessTime = model.BusinessTime;
                d.CityCode = model.CityCode;
                d.AreaCode = model.AreaCode;
                d.ProvinceCode = model.ProvinceCode;
                d.Lat = model.Lat;
                d.Lng = model.Lng;
                d.Tel = model.Tel;
                d.ChannelNo = model.ChannelNo;
                d.ChannelKeys = model.ChannelKeys;
                d.ChannelUrl = model.ChannelUrl;
                d.AuthorFile = model.AuthorFile;
                d.Updated = Date.now();
                return this.Update(d, { _id: d._id });
            }
        }).catch(e => {
            console.error(e);
        });
    }

    UpdateAuthorInfo(model = dbmodel.BusinessInfoModel.AuthorInfo[0], owendBusiness) {
        return this.FindOne({ OwendBusiness: owendBusiness, IsDelete: false }).then(d => {
            if (d == null) {
                throw new Error("数据不存在");
            }
            if (d.AuthorInfo == null) {
                // model.Updated = Date.now();
                d.AuthorInfo.push(model);
            } else {
                let isUpdate = false;
                d.AuthorInfo.forEach(item => {
                    if (item.OpenAPIType == model.OpenAPIType) {
                        isUpdate = true;
                        item.authorizer_appid = model.authorizer_access_appid;
                        item.authorizer_access_token = model.authorizer_access_token;
                        item.expires_in = model.expires_in;
                        item.re_expires_in = model.re_expires_in;
                        item.authorizer_refresh_token = model.authorizer_refresh_token;
                        item.AuthorizationCode = model.AuthorizationCode;
                        item.AuthorizationCodeExpiredTime = model.AuthorizationCodeExpiredTime;
                        item.service_type_info = model.service_type_info;
                        item.alias = model.alias;
                        item.principal_name = model.principal_name;
                    }
                });
                if (!isUpdate) {
                    d.AuthorInfo.push(item);
                }
                d.Updated = Date.now();
            }
            return this.Update(d, { _id: d._id });
        }).catch(err => {
            console.error(err);
        });
    }

    CancelAuhtor(owendBusiness, apiType) {
        return this.FindOne({ OwendBusiness: owendBusiness }).then(d => {
            for (var i = 0; i < d.AuthorInfo.length; i++) {
                if (item.OpenAPIType == apiType) {
                    d.AuthorInfo.splice(i, 1);
                    break;
                }
            }
            d.Updated = Date.now();
            return this.Update(d, { _id: d._id });
        }).catch(err => {
            console.error(err);
        });
    }
}

class SysConfigDbContext extends DbContext {
    constructor() {
        super(sysConfigSchema, "o_SysConfig");
    }
    Save(ConfigType = 0, Content = "") {
        return this.FindOne({ ConfigType: ConfigType }).then(d => {
            if (d == null) {
                return this.Add({ ConfigType: ConfigType, Content: Content });
            }
            else {
                d.Updated = Date.now();
                d.Content = Content;
                return this.Update(d, { ConfigType: d.ConfigType });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    GetComponentAccessToken() {
        return this.FindOne({ ConfigType: constPara.ComponentAccessToken })
            .then(d => {
                if (d == null) {
                    return "";
                    //throw new Error("Token不存在");
                }
                return d.Content;
            }).catch(err => {
                console.error(err);
            });
    }
    GetAccessToken() {
        return this.FindOne({ ConfigType: constPara.AccessToken })
            .then(d => {
                if (d == null) {
                    return "";
                    //throw new Error("Token不存在");
                }
                return d.Content;
            }).catch(err => {
                console.error(err);
            });
    }
}


let userdb = new UserDbContext();
let businessdb = new BussinessInfoDbContext();
let sysConfigdb = new SysConfigDbContext();
exports.userdb = userdb;
exports.businessdb = businessdb;
exports.sysConfigdb = sysConfigdb;