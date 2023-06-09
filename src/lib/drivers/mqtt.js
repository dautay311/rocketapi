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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var paho_mqtt_1 = require("paho-mqtt/src/paho-mqtt");
var tiny_events_1 = require("tiny-events");
var log_1 = require("../log");
var msgpack_lite_1 = __importDefault(require("msgpack-lite"));
var MQTTDriver = /** @class */ (function (_super) {
    __extends(MQTTDriver, _super);
    function MQTTDriver(_a) {
        var _b = _a.host, host = _b === void 0 ? 'localhost' : _b, _c = _a.path, path = _c === void 0 ? '/' : _c, integrationId = _a.integrationId, config = _a.config, _d = _a.logger, logger = _d === void 0 ? log_1.logger : _d, moreConfigs = __rest(_a, ["host", "path", "integrationId", "config", "logger"]);
        var _this = _super.call(this) || this;
        _this.methodCall = function (method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return Promise.resolve();
        };
        host = 'localhost';
        var _e = __read(new RegExp('(.*?)(:([0-9]+))?$').exec(host || 'localhost:3000') || [], 4), _f = _e[1], _host = _f === void 0 ? host : _f, _g = _e[3], port = _g === void 0 ? 8081 : _g;
        _this.config = __assign({}, config, moreConfigs, { host: _host.replace(/^http/, 'ws'), timeout: 20000, port: port });
        _this.logger = logger;
        if (/https/.test(host)) {
            _this.socket = new paho_mqtt_1.Client(_this.config.host + path, 'clientId');
        }
        else {
            _this.socket = new paho_mqtt_1.Client((_this.config.host || '').replace('http://', '').replace('ws://', ''), Number(port), path, 'clientId');
        }
        _this.socket.onMessageArrived = function (_a) {
            var destinationName = _a.destinationName, payloadBytes = _a.payloadBytes;
            if (/room-message/.test(destinationName)) {
                _this.emit('message', { topic: destinationName, message: msgpack_lite_1.default.decode(payloadBytes) });
            }
        };
        return _this;
    }
    MQTTDriver.prototype.connect = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.connect({ userName: 'livechat-guest', password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2Ijp7InZpc2l0b3JUb2tlbiI6ImFqamVvY2N5dXhweXVlOTg3YzJ0NnMifSwidXNlciI6eyJ2Ijp7InZpc2l0b3JUb2tlbiI6ImFqamVvY2N5dXhweXVlOTg3YzJ0NnMifX0sIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.RTQz72NTgI6qWgQMCNHHaSNS13sDK3cz--ss2_5vAz8', onSuccess: resolve, onFailure: reject, useSSL: /https/.test(_this.config.host || '') });
        });
    };
    MQTTDriver.prototype.disconnect = function () {
        this.socket.end();
        return Promise.resolve(this.socket);
    };
    MQTTDriver.prototype.subscribe = function (topic, _a) {
        var _this = this;
        var _b = _a.qos, qos = _b === void 0 ? 0 : _b;
        return new Promise(function (resolve, reject) {
            _this.socket.subscribe(topic, { qos: qos, onFailure: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    console.log.apply(console, __spread(args));
                    reject(args);
                }, onSuccess: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    console.log.apply(console, __spread(args));
                    resolve(args);
                }
            });
        });
    };
    MQTTDriver.prototype.unsubscribe = function (subscription) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            _this.socket.unsubscribe(subscription.name, __spread(args, [function (err, granted) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(granted);
                }]));
        });
    };
    MQTTDriver.prototype.unsubscribeAll = function () {
        return Promise.resolve();
    };
    MQTTDriver.prototype.subscribeNotifyAll = function () {
        return Promise.resolve();
    };
    MQTTDriver.prototype.subscribeLoggedNotify = function () {
        return Promise.resolve();
    };
    MQTTDriver.prototype.subscribeNotifyUser = function () {
        return Promise.resolve();
    };
    MQTTDriver.prototype.login = function (credentials, args) {
        return Promise.resolve();
    };
    // usertyping room-messages deleted messages
    MQTTDriver.prototype.subscribeRoom = function (rid) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.subscribe("room-messages/" + rid, { qos: 0 });
    };
    MQTTDriver.prototype.onMessage = function (cb) {
        this.on('message', function (_a) {
            var topic = _a.topic, message = _a.message;
            if (/room-messages/.test(topic)) {
                cb(message); // TODO apply msgpack
            }
        });
    };
    MQTTDriver.prototype.onTyping = function (cb) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        resolve(_this.on('notify-room', function (_a) {
                            var _b = __read(_a.fields.args, 2), username = _b[0], isTyping = _b[1];
                            cb(username, isTyping);
                        }));
                    })];
            });
        });
    };
    MQTTDriver.prototype.notifyVisitorTyping = function (rid, username, typing, token) {
        return Promise.resolve();
    };
    MQTTDriver.prototype.notifyCallDeclined = function (rid) {
        return Promise.resolve();
    };
    MQTTDriver.prototype.onStreamData = function (name, cb) {
        return Promise.resolve(this.on(name, function (_a) {
            var _b = __read(_a.fields.args, 1), message = _b[0];
            return cb((message));
        }));
    };
    return MQTTDriver;
}(tiny_events_1.EventEmitter));
exports.MQTTDriver = MQTTDriver;
//# sourceMappingURL=mqtt.js.map