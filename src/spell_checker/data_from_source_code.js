"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataGenerator = exports.transpileFile = void 0;
const fs_1 = __importDefault(require("fs"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const ts = __importStar(require("typescript"));
const value_generator_1 = require("./value_generator");
const fsPromises = fs_1.default.promises;
async function transpileFile(pathname) {
    if ((0, isEmpty_1.default)(pathname) || !fs_1.default.existsSync(pathname)) {
        throw new Error(`Cannot find the data file: ${pathname}`);
    }
    const source = await fsPromises.readFile(pathname);
    const result = await ts.transpileModule(source.toString(), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
    const obj = eval(result.outputText);
    return obj;
}
exports.transpileFile = transpileFile;
async function dataGenerator(pathname) {
    const dataObj = await transpileFile(pathname);
    return (0, value_generator_1.valueGenerator)(dataObj);
}
exports.dataGenerator = dataGenerator;
//# sourceMappingURL=data_from_source_code.js.map