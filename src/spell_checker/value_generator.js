"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueGenerator = void 0;
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const isString_1 = __importDefault(require("lodash/isString"));
const isObject_1 = __importDefault(require("lodash/isObject"));
function* valueGenerator(obj) {
    if (!(0, isObject_1.default)(obj) || (0, isEmpty_1.default)(obj)) {
        return null;
    }
    const values = Object.values(obj);
    for (const value of values) {
        if (typeof value === 'string') {
            yield value;
        }
        else if (typeof value === 'object') {
            const gen = valueGenerator(value);
            for (const v of gen) {
                if ((0, isString_1.default)(v)) {
                    yield v;
                }
            }
        }
        else {
            throw new Error(`Found a value that it is not an object or string: ${value}`);
        }
    }
    return null;
}
exports.valueGenerator = valueGenerator;
//# sourceMappingURL=value_generator.js.map