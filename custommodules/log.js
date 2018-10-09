var log4js = require("log4js");
log4js.configure({
    appenders: {
        ruleConsole: { type: 'console' },
        ruleFile: {
            type: 'dateFile',
            filename: 'logs/log-',
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 3,
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['ruleConsole', 'ruleFile'], level: 'info' }
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');
exports.logger = dateFileLog;
exports.use = function (app) {
    //页面请求日志,用auto的话,默认级别是WARN   
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));    
    app.use(log4js.connectLogger(dateFileLog, { level: 'debug', format: ':method :url' }));
}
