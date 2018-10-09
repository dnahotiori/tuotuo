"use strict";
var utitliy = require("../custommodules/Utilitys");
var config = require("./ConfigSite");
var mongodb = require("mongodb").MongoClient;

let dbConntectSync = new Promise(function (resolve, reject) {
    mongodb.connect(config.MongodbConnectionString, { useNewUrlParser: true }).then(db => {
        var dbBase = db.db(config.DataName);
        resolve(dbBase);
    }).catch(err => {
        reject(err);
    });
});

class mongoDbHandler {
    Add(tableName, fields) {
        dbConntectSync.then(dbo => {
            //return dbo.ajax();
            if (fields == null || fields == undefined) {
                throw new Error("字段不可为空");
            }
            fields._id = utitliy.NewGuid();
            return dbo.collection(tableName).insertOne(fields);
        }).then((data) => {
            console.log(data);

        }).catch(err => {
            console.log(err);
        });
    }

    Update(tableName, fields) {
        dbConntectSync.then(dbo => {
            if (fields == null || fields == undefined) {
                throw new Error("字段不可为空");
            }
            return dbo.collection(tableName).update(fields);
        }).catch(err => {
            console.log(err);
        });
    }

    Delete(tableName, where) {
        dbConntectSync.then(dbo => {
            return dbo.collection(tableName).deleteOne(where);
        }).catch(err => {
            console.log(err);
        });
    }

    Select(tableName, where) {
        return dbConntectSync.then((dbo) => {
            if (where == null || where == undefined) {
                where = {};
            }
            var datalist = dbo.collection(tableName).find(where).toArray()
            return Promise.resolve(datalist);
        }).then((datalist) => {
            return datalist;
        }).catch(err => {
            console.log(err);
        });
    }

    Frist(tableName, where) {

        return dbConntectSync.then(dbo => {
            if (where == null || where == undefined)
                where = {};
            return dbo.collection(tableName).findOne(where);
        }).then(data => {
            return data;
        }).catch(err => {
            console.log(err);
        });
    };
}



module.exports = mongoDbHandler;