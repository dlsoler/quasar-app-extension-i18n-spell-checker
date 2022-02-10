"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeWords = exports.removeHTMLTags = exports.removeTemplateVariables = void 0;
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const wink_tokenizer_1 = __importDefault(require("wink-tokenizer"));
const string_strip_html_1 = require("string-strip-html");
const tokenizer = new wink_tokenizer_1.default();
tokenizer.defineConfig({
    word: true,
    currency: false,
    email: false,
    emoji: false,
    emoticon: false,
    hashtag: false,
    number: true,
    ordinal: false,
    punctuation: false,
    symbol: false,
    time: false,
    mention: false,
    url: false
});
const variableRegExp = new RegExp('(%{[^}]+})', 'ig');
function removeTemplateVariables(text) {
    if ((0, isEmpty_1.default)(text)) {
        return '';
    }
    const result = text.replace(variableRegExp, '');
    return result;
}
exports.removeTemplateVariables = removeTemplateVariables;
function removeHTMLTags(text) {
    if ((0, isEmpty_1.default)(text)) {
        return '';
    }
    return (0, string_strip_html_1.stripHtml)(text).result;
}
exports.removeHTMLTags = removeHTMLTags;
function tokenizeWords(text) {
    if ((0, isEmpty_1.default)(text)) {
        return [];
    }
    const textWithoutVariables = removeTemplateVariables(text);
    const textWithoutHTML = removeHTMLTags(textWithoutVariables);
    const tokens = tokenizer.tokenize(textWithoutHTML);
    return tokens;
}
exports.tokenizeWords = tokenizeWords;
//# sourceMappingURL=tokenize.js.map