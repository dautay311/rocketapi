"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../log");
var message_1 = require("../message");
var tiny_events_1 = require("tiny-events");
var Client = /** @class */ (function () {
    function Client(_a) {
        var _b = _a.host, host = _b === void 0 ? 'http://localhost:3000' : _b;
        this._headers = {};
        this.host = host;
    }
    Object.defineProperty(Client.prototype, "headers", {
        get: function () {
            return __assign({ 'Content-Type': 'application/json' }, this._headers);
        },
        set: function (obj) {
            this._headers = obj;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.getHeaders = function (options) {
        return options && options.customHeaders ?
            options.customHeaders :
            this.headers;
    };
    Client.prototype.getBody = function (data) {
        return data instanceof FormData ?
            data :
            JSON.stringify(data);
    };
    Client.prototype.get = function (url, data, options) {
        return fetch(this.host + "/api/v1/" + encodeURI(url) + "?" + this.getParams(data), {
            method: 'GET',
            headers: this.getHeaders(options)
        }).then(this.handle);
    };
    Client.prototype.post = function (url, data, options) {
        return fetch(this.host + "/api/v1/" + encodeURI(url), {
            method: 'POST',
            body: this.getBody(data),
            headers: this.getHeaders(options)
        }).then(this.handle);
    };
    Client.prototype.put = function (url, data, options) {
        return fetch(this.host + "/api/v1/" + encodeURI(url), {
            method: 'PUT',
            body: this.getBody(data),
            headers: this.getHeaders(options)
        }).then(this.handle);
    };
    Client.prototype.delete = function (url, data, options) {
        return fetch(this.host + "/api/v1/" + encodeURI(url), {
            method: 'DELETE',
            body: this.getBody(data),
            headers: this.getHeaders(options)
        }).then(this.handle);
    };
    Client.prototype.handle = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            var status, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = r.status;
                        return [4 /*yield*/, r.json()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, { status: status, data: data }];
                }
            });
        });
    };
    Client.prototype.getParams = function (data) {
        return Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + (typeof data[k] === 'object' ? encodeURIComponent(JSON.stringify(data[k])) : encodeURIComponent(data[k]));
        }).join('&');
    };
    return Client;
}());
exports.regExpSuccess = /(?!([45][0-9][0-9]))\d{3}/;
/**
    * @module API
    * Provides a base client for handling requests with generic Rocket.Chat's REST API
    */
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api(_a) {
        var client = _a.client, host = _a.host, _b = _a.logger, logger = _b === void 0 ? log_1.logger : _b;
        var _this = _super.call(this) || this;
        _this.userId = '';
        _this.currentLogin = null;
        /**
            * Do a request to an API endpoint.
            * If it needs a token, login first (with defaults) to set auth headers.
            * @param method   Request method GET | POST | PUT | DEL
            * @param endpoint The API endpoint (including version) e.g. `chat.update`
            * @param data     Payload for POST request to endpoint
            * @param auth     Require auth headers for endpoint, default true
            * @param ignore   Allows certain matching error messages to not count as errors
            */
        _this.request = function (method, endpoint, data, auth, ignore, options) {
            if (data === void 0) { data = {}; }
            if (auth === void 0) { auth = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var result, _a, hasDataInsideResult, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.logger && this.logger.debug("[API] " + method + " " + endpoint + ": " + JSON.stringify(data));
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 11, , 12]);
                            if (auth && !this.loggedIn()) {
                                throw new Error('');
                            }
                            result = void 0;
                            _a = method;
                            switch (_a) {
                                case 'GET': return [3 /*break*/, 2];
                                case 'PUT': return [3 /*break*/, 4];
                                case 'DELETE': return [3 /*break*/, 6];
                                case 'POST': return [3 /*break*/, 8];
                            }
                            return [3 /*break*/, 8];
                        case 2: return [4 /*yield*/, this.client.get(endpoint, data, options)];
                        case 3:
                            result = _b.sent();
                            return [3 /*break*/, 10];
                        case 4: return [4 /*yield*/, this.client.put(endpoint, data, options)];
                        case 5:
                            result = _b.sent();
                            return [3 /*break*/, 10];
                        case 6: return [4 /*yield*/, this.client.delete(endpoint, data, options)];
                        case 7:
                            result = _b.sent();
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, this.client.post(endpoint, data, options)];
                        case 9:
                            result = _b.sent();
                            return [3 /*break*/, 10];
                        case 10:
                            if (!result)
                                throw new Error("API " + method + " " + endpoint + " result undefined");
                            if (!this.success(result, ignore))
                                throw result;
                            this.logger && this.logger.debug("[API] " + method + " " + endpoint + " result " + result.status);
                            hasDataInsideResult = result && !result.data;
                            return [2 /*return*/, (method === 'DELETE') && hasDataInsideResult ? result : result.data];
                        case 11:
                            err_1 = _b.sent();
                            this.logger && this.logger.error("[API] POST error(" + endpoint + "): " + JSON.stringify(err_1));
                            throw err_1;
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        /** Do a POST request to an API endpoint. */
        _this.post = function (endpoint, data, auth, ignore, options) {
            if (options === void 0) { options = {}; }
            return _this.request('POST', endpoint, data, auth, ignore, options);
        };
        /** Do a GET request to an API endpoint. */
        _this.get = function (endpoint, data, auth, ignore, options) {
            if (options === void 0) { options = {}; }
            return _this.request('GET', endpoint, data, auth, ignore, options);
        };
        /** Do a PUT request to an API endpoint. */
        _this.put = function (endpoint, data, auth, ignore, options) {
            if (options === void 0) { options = {}; }
            return _this.request('PUT', endpoint, data, auth, ignore, options);
        };
        /** Do a DELETE request to an API endpoint. */
        _this.del = function (endpoint, data, auth, ignore, options) {
            if (options === void 0) { options = {}; }
            return _this.request('DELETE', endpoint, data, auth, ignore, options);
        };
        _this.client = client || new Client({ host: host });
        _this.logger = log_1.logger;
        return _this;
    }
    Object.defineProperty(Api.prototype, "username", {
        get: function () {
            return this.currentLogin && this.currentLogin.username;
        },
        enumerable: true,
        configurable: true
    });
    Api.prototype.loggedIn = function () {
        return Object.keys(this.currentLogin || {}).every(function (e) { return e; });
    };
    /** Check result data for success, allowing override to ignore some errors */
    Api.prototype.success = function (result, ignore) {
        return (typeof result.status === 'undefined' ||
            (result.status && exports.regExpSuccess.test(result.status)) ||
            (result.status && ignore && ignore.test(result.status))) ? true : false;
    };
    Api.prototype.login = function (credentials, args) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('login', __assign({}, credentials, args))];
                    case 1:
                        data = (_a.sent()).data;
                        this.userId = data.userId;
                        this.currentLogin = {
                            username: data.me.username,
                            userId: data.userId,
                            authToken: data.authToken,
                            result: data
                        };
                        this.client.headers = {
                            'X-Auth-Token': data.authToken,
                            'X-User-Id': data.userId
                        };
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Api.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentLogin) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.post('logout', {}, true)];
                    case 1:
                        result = _a.sent();
                        this.userId = '';
                        this.currentLogin = null;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Structure message content, optionally addressing to room ID.
     * Accepts message text string or a structured message object.
     */
    Api.prototype.prepareMessage = function (content, rid, args) {
        return new message_1.Message(content, __assign({ rid: rid, roomId: rid }, args));
    };
    return Api;
}(tiny_events_1.EventEmitter));
exports.default = Api;
//# sourceMappingURL=api.js.map