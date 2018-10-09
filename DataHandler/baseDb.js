"use strict";

var mongoose = require("mongoose");
var config = require("../custommodules/ConfigSite");

class baseDb {
    constructor() {
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, '数据库连接失败 error:'));
        db.once('open', function () {
            console.log("数据库连接成功")
        });

        mongoose.connect(config.MongodbConnectionString, { useNewUrlParser: true, dbName: config.DataName });
    }
}
new baseDb();
module.exports = mongoose;