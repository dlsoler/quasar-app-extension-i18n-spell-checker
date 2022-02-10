"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramValue = void 0;
const lodash_1 = require("lodash");
function paramValue(params, paramName) {
    if ((0, lodash_1.isUndefined)(paramName))
        return undefined;
    if ((0, lodash_1.isString)(paramName))
        return params[paramName];
    if ((0, lodash_1.isArray)(paramName) && !(0, lodash_1.isEmpty)(paramName)) {
        for (const key of paramName) {
            if ((0, lodash_1.has)(params, key)) {
                return params[key];
            }
        }
    }
    return undefined;
}
exports.paramValue = paramValue;
//# sourceMappingURL=param_value.js.map