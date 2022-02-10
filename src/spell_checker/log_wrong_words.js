"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlogWithLineNumber = exports.logColorizedText = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function logColorizedText(text, words) {
    let colorizedText = text;
    words.forEach((word) => {
        colorizedText = colorizedText.replace(word, chalk_1.default.red(word));
    });
    return colorizedText;
}
exports.logColorizedText = logColorizedText;
async function getlogWithLineNumber(dataPathname) {
    const lines = (await fs_extra_1.default.readFile(dataPathname)).toString().split('\n');
    return function (text, words) {
        const lineNumber = lines.findIndex((line) => line.includes(text)) + 1;
        return `line #${lineNumber}: ${logColorizedText(text, words)}`;
    };
}
exports.getlogWithLineNumber = getlogWithLineNumber;
//# sourceMappingURL=log_wrong_words.js.map