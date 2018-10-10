var opt = {
    url: String,
    body: JSON,
    mothed: "POST",
    ver: "v1",
    isNoSign: false
}

class APIRequestBase {
    constructor(opthion = opt) {
        var opts = opt;
        Object.assign(opts, opthion);
        this.Ver = opts.ver;
        this.url = opts.url;
        this.isNoSign = opts.isNoSign;
        this.requestBody = opts.body;
        this.mothed = opts.mothed;
    }
    
    get APIVer() {
        return this.Ver;
    }
    
    get Url() {
        return this.url;
    }
    
    get IsNoSign() {
        return this.isNoSign;
    }
    
    get RequestBody() {
        return this.requestBody;
    }
    
    get Mothed() {
        return this.mothed;
    }
}

module.exports = APIRequestBase;