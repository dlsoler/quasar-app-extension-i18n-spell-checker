"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDictPath = exports.displaySaveDictPathHelp = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const param_value_1 = require("./param_value");
function displaySaveDictPathHelp() {
    console.log('The command save-dictionary-path saves in the Quasar persistent configuration the path to the directory where the .aff and .dic files are stored.');
    console.log('You can use this command once to avoid to write the path each time you run the command spellcheck');
    console.log('\nUsage:');
    console.log('quasar run i18n-spell-checker save-dictionary-path --path <DICTIONARIES_DIRECTORY>');
    console.log('Options');
    console.log('--path, -p Full path to the dictionary directory');
    console.log('\nExamples:');
    console.log('quasar run i18n-spell-checker save-dictionary-path --path ~/dictionaries/en-US');
    console.log('quasar run i18n-spell-checker save-dictionary-path -p ~/dictionaries/en-US');
    console.log('\n');
}
exports.displaySaveDictPathHelp = displaySaveDictPathHelp;
function saveDictPath(api) {
    return async (commandArguments) => {
        const dicPath = (0, param_value_1.paramValue)(commandArguments.params, ['p', 'path']);
        const cfg = api.getPersistentConf();
        if ((0, isString_1.default)(dicPath) && !(0, isEmpty_1.default)(dicPath)) {
            api.mergePersistentConf({ path: dicPath });
        }
        if (cfg.path) {
            console.log('Current dictionaries directory pathname is: ', cfg.path);
        }
        else {
            console.log('There is no saved dictionaries directory path');
        }
        displaySaveDictPathHelp();
        return;
    };
}
exports.saveDictPath = saveDictPath;
//# sourceMappingURL=save_dict_path.js.map