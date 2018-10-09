import { Schema, Model } from "mongoose";
import dbmodel from "../DataHandler/dbModel";

export const userdb: UserDbContext;
export const businessdb: BussinessInfoDbContext;
export const openAPIPayConfigdb: OpenAPIPayConfigDbContext;
export const sysConfigdb: SysConfigDbContext;

declare class DbContext {
    constructor(cSchema: Schema, tableName: String);
    /**
     * 
     * @param doc 添加字段数据
     */
    Add(doc: any): Promise<any>;
    /**
     * 
     * @param conditions 查找条件
     */
    Find(conditions: any): Promise<any[]>;
    /**
     * 
     * @param conditions 查找条件
     */
    FindOne(conditions: any): Promise<any>;
    /**
     * 
     * @param doc 需要修改的字段数据
     * @param conditions 条件
     */
    Update(doc: any, conditions: any): Promise<any>;
    /**
     * 假删除
     * @param Id 
     */
    Delete(Id): Promise<any>;
    /**
     * 真删
     * @param Id 
     */
    Remove(Id): Promise<any>;
}


declare class UserDbContext extends DbContext {
    /**
     * 
     * @param openid 
     * @param name 
     * @param headUrl 
     * @param accesstoke 
     * @param expiresin 
     * @param refreshtoken 
     */
    Save(openid: String, name: String, headUrl: String, accesstoke: String, expiresin: Number, refreshtoken: String): Promise<any>;
}

declare class BussinessInfoDbContext extends DbContext {
    Save(model: object): Promise<any>;
    UpdateAuthorInfo(model: object, owendBusiness: String): Promise<any>;
    CancelAuhtor(owendBusiness: String, apiType: number): Promise<any>;
}

declare class SysConfigDbContext extends DbContext {
    Save(ConfigType: number, Content: String): Promise<any>;
    GetComponentAccessToken(): Promise<any>;
}


