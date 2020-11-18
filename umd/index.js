(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fast-equals')) :
    typeof define === 'function' && define.amd ? define(['fast-equals'], factory) :
    (global = global || self, global.inlineTest = factory(global['fast-equals']));
}(this, (function (fastEquals) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    var load = function (a) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.resolve(a)];
                case 1:
                    a = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    a = err_1;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, a];
            }
        });
    }); };
    var e2eIndexs = {};
    var lastAppendTime = Date.now();
    var cache = {};
    var inlineTest = function (index, desc, fn) {
        var checkDeepEqual = function (a, b, message) {
            if (message === void 0) { message = ""; }
            return __awaiter(void 0, void 0, void 0, function () {
                var err_2, err_3, isEqual;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.resolve(a)];
                        case 1:
                            a = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _a.sent();
                            a = err_2;
                            return [3 /*break*/, 3];
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, Promise.resolve(b)];
                        case 4:
                            b = _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            err_3 = _a.sent();
                            b = err_3;
                            return [3 /*break*/, 6];
                        case 6:
                            isEqual = fastEquals.deepEqual(a, b);
                            if (!isEqual) {
                                throw "[TEST FAIL " + index + "] [" + desc + (message ? " -> " + message : "") + "]:  " + JSON.stringify(a) + " != " + JSON.stringify(b);
                            }
                            return [2 /*return*/, a];
                    }
                });
            });
        };
        if (process.env.e2e) {
            e2eIndexs[index] = [desc, fn, checkDeepEqual];
            lastAppendTime = Date.now();
        }
    };
    function runE2e() {
        return __awaiter(this, void 0, void 0, function () {
            var list, _i, list_1, index, _a, desc, fn, checkDeepEqual;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        list = Object.keys(e2eIndexs).sort(function (a, b) { return Number(a) - Number(b); });
                        _i = 0, list_1 = list;
                        _b.label = 1;
                    case 1:
                        if (!(_i < list_1.length)) return [3 /*break*/, 4];
                        index = list_1[_i];
                        _a = e2eIndexs[index], desc = _a[0], fn = _a[1], checkDeepEqual = _a[2];
                        return [4 /*yield*/, fn({
                                equal: checkDeepEqual,
                                load: load,
                                cache: cache,
                            })];
                    case 2:
                        _b.sent();
                        console.log("[TEST PASS " + index + "] [" + desc + "]");
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    setTimeout(function () {
        if (process.env.e2e) {
            global.e2e = {};
            var timeOutRun_1 = function () {
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (Date.now() - lastAppendTime > 100) {
                            runE2e();
                        }
                        else {
                            timeOutRun_1();
                        }
                        return [2 /*return*/];
                    });
                }); }, 100);
            };
            timeOutRun_1();
        }
    }, 100);
    inlineTest.cache = {};

    return inlineTest;

})));
//# sourceMappingURL=index.js.map
