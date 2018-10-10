//var http = require('http')
//var querystring = require('querystring')
"use strict";
var request = require("request");
var http = require("http");


function FuncHttpPOST(url, requestbody) {
    var promise = new Promise(function (resolve, reject) {
        request({
            url: url,
            method: "post",//如果是post就涉及到跨域的问题了
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: requestbody
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(response.statusMessage + " " + error);
                reject(response.statusMessage);
            }
        });
    });
    return promise;
}

function FuncHttpGet(url = "", encodStr = "utf-8") {
    var promise = new Promise(function (resolve, reject) {

        request({
            url: url,
            method: "GET",
            encoding: encodStr
        }, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                if (encodStr != null) {
                    console.log(body);
                }

                resolve(body);
            }
            else {
                console.log(error);
                reject(error);
            }
        });
    });
    return promise;
}


class SDKHttp {
    HttpPOST(url, body) {
        return FuncHttpPOST(url, body);
    }
    HttpGet(url, encodStr) {
        return FuncHttpGet(url, encodStr);
    }
}

module.exports = new SDKHttp();