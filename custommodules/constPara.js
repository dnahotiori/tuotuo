class constPara {
    /**
     * 微信授权类型
     */
    get AUTHOR_WX() {
        return 1;
    }
    /**
    * 支付宝授权类型
    */
    get AUTHOR_ALIPAY() {
        return 2;
    }
    /**
     * Ticket
     */
    get ComponentVerifyTicket() {
        return 0;
    }
    /**
     * ComponentAccessToken
     */
    get ComponentAccessToken() {
        return 1;
    }
    get AccessToken(){
        return 2;
    }
}


module.exports = new constPara();
