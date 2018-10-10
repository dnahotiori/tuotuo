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
        this.APIVer = opts.ver;
        this.Url = opts.url;
        this.IsNoSign = opts.isNoSign;
        this.RequestBody = opts.body;
        this.Mothed = opts.mothed;
    }
    set APIVer(value) {
        this.Ver = value;
    }
    get APIVer() {
        return this.Ver;
    }
    set Url(value) {
        this.url = value;
    }
    get Url() {
        return this.url;
    }
    set IsNoSign(value) {
        this.isNoSign = value;
    }
    get IsNoSign() {
        return this.isNoSign;
    }
    set RequestBody(value) {
        this.requestBody = value;
    }
    get RequestBody() {
        return this.requestBody;
    }
    set Mothed(value) {
        this.mothed = value;
    }
    get Mothed() {
        return this.mothed;
    }
}

module.exports = APIRequestBase;