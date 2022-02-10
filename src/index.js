"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spellcheck_1 = require("./commands/spellcheck");
const save_dict_path_1 = require("./commands/save_dict_path");
module.exports = function (api) {
    api.registerCommand('spellcheck', ((0, spellcheck_1.spellCheck)(api)));
    api.registerCommand('save-dictionary-path', ((0, save_dict_path_1.saveDictPath)(api)));
};
//# sourceMappingURL=index.js.map