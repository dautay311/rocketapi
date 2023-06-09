"use strict";
/**
 * @module DDPDriver
 * Handles low-level websocket ddp connections and event subscriptions
 */
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
var universal_websocket_client_1 = __importDefault(require("universal-websocket-client"));
var tiny_events_1 = require("tiny-events");
var log_1 = require("../log");
tiny_events_1.EventEmitter.prototype.removeAllListeners = function (event) {
    if (event) {
        this._listeners[event] = [];
    }
    else {
        this._listeners = {};
    }
    return [];
};
var interfaces_1 = require("../../interfaces");
var util_1 = require("../util");
var js_sha256_1 = require("js-sha256");
/** Websocket handler class, manages connections and subscriptions by DDP */
var Socket = /** @class */ (function (_super) {
    __extends(Socket, _super);
    /** Create a websocket handler */
    function Socket(options, resume) {
        if (resume === void 0) { resume = null; }
        var _this = _super.call(this) || this;
        _this.resume = resume;
        _this.sent = 0;
        _this.lastPing = Date.now();
        _this.subscriptions = {};
        _this.handlers = [];
        /**
         * Open websocket connection, with optional retry interval.
         * Stores connection, setting up handlers for open/close/message events.
         * Resumes login if given token.
         */
        _this.open = function (ms) {
            if (ms === void 0) { ms = _this.config.reopen; }
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var connection;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.lastPing = Date.now();
                            return [4 /*yield*/, this.close()];
                        case 1:
                            _a.sent();
                            if (this.reopenInterval)
                                clearInterval(this.reopenInterval);
                            this.reopenInterval = setInterval(function () {
                                return !_this.alive() && _this.reopen();
                            }, ms);
                            try {
                                connection = new universal_websocket_client_1.default(this.host);
                                connection.onerror = reject;
                            }
                            catch (err) {
                                this.logger.error(err);
                                return [2 /*return*/, reject(err)];
                            }
                            this.connection = connection;
                            this.connection.onmessage = this.onMessage.bind(this);
                            this.connection.onclose = this.onClose.bind(this);
                            this.connection.onopen = this.onOpen.bind(this, resolve);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /** Send handshake message to confirm connection, start pinging. */
        _this.onOpen = function (callback) { return __awaiter(_this, void 0, void 0, function () {
            var connected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.send({
                            msg: 'connect',
                            version: '1',
                            support: ['1', 'pre2', 'pre1']
                        })];
                    case 1:
                        connected = _a.sent();
                        this.session = connected.session;
                        this.ping().catch(function (err) { return _this.logger.error("[ddp] Unable to ping server: " + err.message); });
                        this.emit('open');
                        if (!this.resume) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.login(this.resume)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, callback(this.connection)];
                }
            });
        }); };
        /** Emit close event so it can be used for promise resolve in close() */
        _this.onClose = function (e) {
            try {
                _this.emit('close', e);
                if (e.code !== 1000) {
                    return _this.reopen();
                }
                else {
                    if (_this.reopenInterval)
                        clearInterval(_this.reopenInterval);
                    _this.openTimeout && clearTimeout(_this.openTimeout);
                    _this.pingTimeout && clearTimeout(_this.pingTimeout);
                    delete _this.connection;
                }
                _this.logger.info("[ddp] Close (" + e.code + ") " + e.reason);
            }
            catch (error) {
                _this.logger.error(error);
            }
        };
        /**
         * Find and call matching handlers for incoming message data.
         * Handlers match on collection, id and/or msg attribute in that order.
         * Any matched handlers are removed once called.
         * All collection events are emitted with their `msg` as the event name.
         */
        _this.onMessage = function (e) {
            _this.lastPing = Date.now();
            void _this.ping();
            var data = (e.data) ? JSON.parse(e.data) : undefined;
            _this.logger.debug(data); // 👈  very useful for debugging missing responses
            if (!data)
                return _this.logger.error("[ddp] JSON parse error: " + e.message);
            _this.logger.debug("[ddp] messages received: " + e.data);
            if (data.collection)
                _this.emit(data.collection, data);
            if (data.msg)
                _this.emit(data.msg, data);
        };
        /** Disconnect the DDP from server and clear all subscriptions. */
        _this.close = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) return [3 /*break*/, 2];
                        this.unsubscribeAll().catch(function (e) { return _this.logger.debug(e); });
                        return [4 /*yield*/, new Promise(function (resolve) {
                                if (_this.connection) {
                                    _this.once('close', resolve);
                                    _this.connection.close(1000, 'disconnect');
                                    return;
                                }
                            })
                                .catch(this.logger.error)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve()];
                }
            });
        }); };
        /** Clear connection and try to connect again. */
        _this.reopen = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.openTimeout)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.close()];
                    case 1:
                        _a.sent();
                        this.openTimeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        delete this.openTimeout;
                                        return [4 /*yield*/, this.open()
                                                .catch(function (err) { return _this.logger.error("[ddp] Reopen error: " + err.message); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, this.config.reopen);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Send an object to the server via Socket. Adds handler to collection to
         * allow awaiting response matching an expected object. Most responses are
         * identified by their message event name and the ID they were sent with, but
         * some responses don't return the ID fallback to just matching on event name.
         * Data often includes an error attribute if something went wrong, but certain
         * types of calls send back a different `msg` value instead, e.g. `nosub`.
         * @param obj       Object to be sent
         * @param msg       The `data.msg` value to wait for in response
         * @param errorMsg  An alternate `data.msg` value indicating an error response
         */
        _this.send = function (obj) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!_this.connection)
                            throw new Error('[ddp] sending without open connection');
                        var id = obj.id || "ddp-" + _this.sent;
                        _this.sent += 1;
                        var data = __assign({}, obj, (/connect|ping|pong/.test(obj.msg) ? {} : { id: id }));
                        var stringdata = JSON.stringify(data);
                        _this.logger.debug("[ddp] sending message: " + stringdata);
                        _this.connection.send(stringdata);
                        _this.once('disconnected', reject);
                        var listener = (data.msg === 'ping' && 'pong') || (data.msg === 'connect' && 'connected') || data.id;
                        if (!listener) {
                            return resolve();
                        }
                        _this.once(listener, function (result) {
                            _this.off('disconnect', reject);
                            return (result.error ? reject(result.error) : resolve(__assign({}, (/connect|ping|pong/.test(obj.msg) ? {} : { id: id }), result)));
                        });
                    })];
            });
        }); };
        /** Send ping, record time, re-open if nothing comes back, repeat */
        _this.ping = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.pingTimeout && clearTimeout(this.pingTimeout);
                this.pingTimeout = setTimeout(function () {
                    _this.send({ msg: 'ping' })
                        .then(function () {
                        return _this.ping();
                    })
                        .catch(function () { return _this.reopen(); });
                }, this.config.ping);
                return [2 /*return*/];
            });
        }); };
        /** Check if ping-pong to server is within tolerance of 1 missed ping */
        _this.alive = function () {
            if (!_this.lastPing)
                return false;
            return (Date.now() - _this.lastPing <= _this.config.ping * 2);
        };
        /**
         * Calls a method on the server and returns a promise resolved
         * with the result of the method.
         * @param method    The name of the method to be called
         * @param params    An array with the parameters to be sent
         */
        _this.call = function (method) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var response;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.send({ msg: 'method', method: method, params: params })
                                .catch(function (err) {
                                _this.logger.error("[ddp] Call error: " + err.message);
                                throw err;
                            })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, (response.result) ? response.result : response];
                    }
                });
            });
        };
        /**
         * Login to server and resubscribe to all subs, resolve with user information.
         * @param credentials User credentials (username/password, oauth or token)
         */
        _this.login = function (credentials) { return __awaiter(_this, void 0, void 0, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = this.loginParams(credentials);
                        _a = this;
                        return [4 /*yield*/, this.call('login', params)];
                    case 1:
                        _a.resume = (_b.sent());
                        return [4 /*yield*/, this.subscribeAll()];
                    case 2:
                        _b.sent();
                        this.emit('login', this.resume);
                        return [2 /*return*/, this.resume];
                }
            });
        }); };
        /** Take variety of login credentials object types for accepted params */
        _this.loginParams = function (credentials) {
            if (interfaces_1.isLoginPass(credentials) ||
                interfaces_1.isLoginOAuth(credentials) ||
                interfaces_1.isLoginAuthenticated(credentials)) {
                return credentials;
            }
            if (interfaces_1.isLoginResult(credentials)) {
                var params_1 = {
                    resume: credentials.token
                };
                return params_1;
            }
            var params = {
                user: { username: credentials.username },
                password: {
                    digest: js_sha256_1.sha256(credentials.password),
                    algorithm: 'sha-256'
                }
            };
            return params;
        };
        /** Logout the current User from the server via Socket. */
        _this.logout = function () {
            _this.resume = null;
            return _this.unsubscribeAll()
                .then(function () { return _this.call('logout'); });
        };
        /** Register a callback to trigger on message events in subscription */
        _this.onEvent = function (id, callback) {
            _this.on(id, callback);
        };
        /**
         * Subscribe to a stream on server via socket and returns a promise resolved
         * with the subscription object when the subscription is ready.
         * @param name      Stream name to subscribe to
         * @param params    Params sent to the subscription request
         */
        _this.subscribe = function (name, params, callback) {
            _this.logger.info("[ddp] Subscribe to " + name + ", param: " + JSON.stringify(params));
            return _this.send({ msg: 'sub', name: name, params: params })
                .then(function (result) {
                var id = (result.subs) ? result.subs[0] : undefined;
                var unsubscribe = _this.unsubscribe.bind(_this, id);
                var onEvent = _this.onEvent.bind(_this, name);
                var subscription = { id: id, name: name, params: params, unsubscribe: unsubscribe, onEvent: onEvent };
                if (callback)
                    subscription.onEvent(callback);
                _this.subscriptions[id] = subscription;
                return subscription;
            })
                .catch(function (err) {
                _this.logger.error("[ddp] Subscribe error: " + err.message);
                throw err;
            });
        };
        /** Subscribe to all pre-configured streams (e.g. on login resume) */
        _this.subscribeAll = function () {
            var subscriptions = Object.keys(_this.subscriptions || {}).map(function (key) {
                var _a = _this.subscriptions[key], name = _a.name, params = _a.params;
                return _this.subscribe(name, params);
            });
            return Promise.all(subscriptions);
        };
        /** Unsubscribe to server stream, resolve with unsubscribe request result */
        _this.unsubscribe = function (id) {
            if (!_this.subscriptions[id])
                return Promise.reject(id);
            delete _this.subscriptions[id];
            return _this.send({ msg: 'unsub', id: id })
                .then(function (data) { return data.result || data.subs; })
                .catch(function (err) {
                if (!err.msg && err.msg !== 'nosub') {
                    _this.logger.error("[ddp] Unsubscribe error: " + err.message);
                    throw err;
                }
            });
        };
        /** Unsubscribe from all active subscriptions and reset collection */
        _this.unsubscribeAll = function () {
            var unsubAll = Object.keys(_this.subscriptions).map(function (id) {
                return _this.subscriptions[id].unsubscribe();
            });
            return Promise.all(unsubAll)
                .then(function () { return _this.subscriptions = {}; });
        };
        _this.logger = options.logger || log_1.logger;
        _this.config = {
            host: options.host || 'http://localhost:3000',
            useSsl: options.useSsl || false,
            reopen: options.reopen || 10000,
            ping: options.timeout || 30000
        };
        _this.host = util_1.hostToWS(_this.config.host, _this.config.useSsl) + "/websocket";
        _this.on('ping', function () {
            _this.send({ msg: 'pong' }).then(_this.logger.debug, _this.logger.error);
        });
        _this.on('result', function (data) { return _this.emit(data.id, { id: data.id, result: data.result, error: data.error }); });
        _this.on('ready', function (data) { return _this.emit(data.subs[0], data); });
        return _this;
    }
    Object.defineProperty(Socket.prototype, "connected", {
        /** Check if websocket connected and ready. */
        get: function () {
            return !!(this.connection &&
                this.connection.readyState === 1 &&
                this.alive());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Socket.prototype, "loggedIn", {
        /** Check if connected and logged in */
        get: function () {
            return (this.connected && !!this.resume);
        },
        enumerable: true,
        configurable: true
    });
    return Socket;
}(tiny_events_1.EventEmitter));
exports.Socket = Socket;
var DDPDriver = /** @class */ (function (_super) {
    __extends(DDPDriver, _super);
    function DDPDriver(_a) {
        if (_a === void 0) { _a = {}; }
        var _b = _a.host, host = _b === void 0 ? 'localhost:3000' : _b, integrationId = _a.integrationId, config = _a.config, _c = _a.logger, logger = _c === void 0 ? log_1.logger : _c, moreConfigs = __rest(_a, ["host", "integrationId", "config", "logger"]);
        var _this = _super.call(this) || this;
        /**
         * Websocket subscriptions, exported for direct polling by adapters
         * Variable not initialised until `prepMeteorSubscriptions` called.
         * @deprecated Use `ddp.Socket` instance subscriptions instead.
         */
        _this.subscriptions = {};
        /** Current user object populated from resolved login */
        _this.userId = '';
        /** Array of joined room IDs (for reactive queries) */
        _this.joinedIds = [];
        /**
         * Initialise socket instance with given options or defaults.
         * Proxies the DDP module socket connection. Resolves with socket when open.
         * Accepts callback following error-first-pattern.
         * Error returned or promise rejected on timeout.
         * @example <caption>Using promise</caption>
         *  import { driver } from '@rocket.chat/sdk'
         *  driver.connect()
         *    .then(() => console.log('connected'))
         *    .catch((err) => console.error(err))
         */
        _this.connect = function (c) {
            if (c === void 0) { c = {}; }
            if (_this.connected) {
                return Promise.resolve(_this);
            }
            var config = __assign({}, _this.config, c); // override defaults
            return new Promise(function (resolve, reject) {
                _this.logger.info('[driver] Connecting', config);
                _this.subscriptions = _this.ddp.subscriptions;
                _this.ddp.open().catch(function (err) {
                    _this.logger.error("[driver] Failed to connect: " + err.message);
                    reject(err);
                });
                _this.ddp.on('open', function () { return _this.emit('connected'); }); // echo ddp event
                var cancelled = false;
                var rejectionTimeout = setTimeout(function () {
                    _this.logger.info("[driver] Timeout (" + config.timeout + ")");
                    var err = new Error('Socket connection timeout');
                    cancelled = true;
                    _this.ddp.removeAllListeners('connected');
                    reject(err);
                }, config.timeout);
                // if to avoid condition where timeout happens before listener to 'connected' is added
                // and this listener is not removed (because it was added after the removal)
                if (!cancelled) {
                    _this.once('connected', function () {
                        _this.logger.info('[driver] Connected');
                        if (cancelled)
                            return _this.ddp.close(); // cancel if already rejected
                        clearTimeout(rejectionTimeout);
                        resolve(_this);
                    });
                }
            });
        };
        _this.disconnect = function () {
            return _this.ddp.close();
        };
        _this.subscribe = function (topic, eventname) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            _this.logger.info("[DDP driver] Subscribing to " + topic + " | " + JSON.stringify(args));
            return _this.ddp.subscribe(topic, [eventname, { 'useCollection': false, 'args': args }]);
        };
        _this.subscribeNotifyAll = function () {
            var topic = 'stream-notify-all';
            return Promise.all([
                'roles-change',
                'updateEmojiCustom',
                'deleteEmojiCustom',
                'updateAvatar',
                'public-settings-changed',
                'permissions-changed'
            ].map(function (event) { return _this.subscribe(topic, event, false); }));
        };
        _this.subscribeLoggedNotify = function () {
            var topic = 'stream-notify-logged';
            return Promise.all([
                'Users:NameChanged',
                'Users:Deleted',
                'updateAvatar',
                'updateEmojiCustom',
                'deleteEmojiCustom',
                'roles-change'
            ].map(function (event) { return _this.subscribe(topic, event, false); }));
        };
        _this.subscribeNotifyUser = function () {
            var topic = 'stream-notify-user';
            return Promise.all([
                'message',
                'otr',
                'webrtc',
                'notification',
                'rooms-changed',
                'subscriptions-changed',
                'uiInteraction'
            ].map(function (event) { return _this.subscribe(topic, _this.userId + "/" + event, false); }));
        };
        _this.subscribeRoom = function (rid) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var topic = 'stream-notify-room';
            return Promise.all([
                _this.subscribe.apply(_this, __spread(['stream-room-messages', rid], args)),
                _this.subscribe.apply(_this, __spread([topic, rid + "/typing"], args)),
                _this.subscribe.apply(_this, __spread([topic, rid + "/deleteMessage"], args))
            ]);
        };
        /** Login to Rocket.Chat via DDP */
        _this.login = function (credentials, args) { return __awaiter(_this, void 0, void 0, function () {
            var login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.ddp || !this.ddp.connected)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.logger.info("[DDP driver] Login with " + JSON.stringify(credentials));
                        return [4 /*yield*/, this.ddp.login(credentials)];
                    case 3:
                        login = _a.sent();
                        this.userId = login.id;
                        return [2 /*return*/, login];
                }
            });
        }); };
        _this.logout = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.ddp && this.ddp.connected)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ddp.logout()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /** Unsubscribe from Meteor stream. Proxy for socket unsubscribe. */
        _this.unsubscribe = function (subscription) {
            return _this.ddp.unsubscribe(subscription.id);
        };
        /** Unsubscribe from all subscriptions. Proxy for socket unsubscribeAll */
        _this.unsubscribeAll = function () {
            return _this.ddp.unsubscribeAll();
        };
        _this.onStreamData = function (event, cb) {
            function listener(message) {
                cb((message));
            }
            return Promise.resolve(_this.ddp.on(event, listener))
                .then(function () { return ({
                stop: function () { return _this.ddp.off(event, listener); }
            }); });
        };
        _this.onMessage = function (cb) {
            _this.ddp.on('stream-room-messages', function (_a) {
                var _b = __read(_a.fields.args, 1), message = _b[0];
                return cb(_this.ejsonMessage(message));
            });
        };
        _this.onTyping = function (cb) {
            return _this.ddp.on('stream-notify-room', function (_a) {
                var _b = __read(_a.fields.args, 2), username = _b[0], isTyping = _b[1];
                cb(username, isTyping);
            });
        };
        _this.notifyVisitorTyping = function (rid, username, typing, token) {
            return _this.ddp.call('stream-notify-room', rid + "/typing", username, typing, { token: token });
        };
        _this.notifyCallDeclined = function (rid) {
            return _this.ddp.call('stream-notify-room', rid + "/webrtc", 'callStatus', { callStatus: 'declined' });
        };
        _this.ejsonMessage = function (message) {
            if (message.ts) {
                message.ts = new Date(message.ts.$date);
            }
            return message;
        };
        _this.methodCall = function (method) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = _this.ddp).call.apply(_a, __spread([method], args));
        };
        _this.config = __assign({}, config, moreConfigs, { host: host.replace(/(^\w+:|^)\/\//, ''), timeout: 20000 });
        _this.ddp = new Socket(__assign({}, _this.config, { logger: logger }));
        _this.logger = logger;
        return _this;
    }
    Object.defineProperty(DDPDriver.prototype, "connected", {
        get: function () {
            return !!this.ddp.connected;
        },
        enumerable: true,
        configurable: true
    });
    return DDPDriver;
}(tiny_events_1.EventEmitter));
exports.DDPDriver = DDPDriver;
//# sourceMappingURL=ddp.js.map