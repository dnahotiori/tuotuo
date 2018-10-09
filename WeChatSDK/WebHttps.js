//var http = require('http')
//var querystring = require('querystring')
"use strict";
var request = require("request");


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

function FuncHttpGet(url) {
    var promise = new Promise(function (resolve, reject) {

        request(url, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                console.log(body);
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

class WebHttps {
    HttpPOST(url, body) {
        return FuncHttpPOST(url, body);
    }
    HttpGet(url) {
        return FuncHttpGet(url);
    }
}

module.exports = new WebHttps();