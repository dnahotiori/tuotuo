var schedule = require('node-schedule');
var weChatTask = require('../autoSchedule/weChatTask');
function RefreshToken() {
    var rule = new schedule.RecurrenceRule();
    rule.minute = [1, 11, 21, 31, 41, 51];
    schedule.scheduleJob(rule, function () {
        weChatTask.RefreshComponentToken();
    });
    schedule.scheduleJob(rule, function () {
        weChatTask.RefreshAccessToken();
    });
}

module.exports = RefreshToken();