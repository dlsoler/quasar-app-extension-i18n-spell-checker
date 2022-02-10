"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spellCheck = exports.getDicPathname = exports.getAffixPathname = exports.commutateSeparator = exports.displaySpellCheckHelp = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const isString_1 = __importDefault(require("lodash/isString"));
const param_value_1 = require("./param_value");
const check_spell_1 = require("../spell_checker/check_spell");
const log_wrong_words_1 = require("../spell_checker/log_wrong_words");
function displaySpellCheckHelp() {
    console.log('\nUsage:');
    console.log('quasar run i18n-spell-checker spellcheck --language <LANGUAGE> <options>');
    console.log('Options');
    console.log('--language, -l i18n language to check');
    console.log('--path, -p Full path to the dictionary directory');
    console.log('--number, -n Number of line in the file');
    console.log('\nExamples:');
    console.log('quasar run i18n-spell-checker spellcheck --language en-US ');
    console.log('quasar run i18n-spell-checker spellcheck --language en-US --path ~/dictionaries/en-US');
    console.log('\n');
}
exports.displaySpellCheckHelp = displaySpellCheckHelp;
function commutateSeparator(langId) {
    if (langId.includes('-')) {
        return langId.replace('-', '_');
    }
    if (langId.includes('_')) {
        return langId.replace('-', '_');
    }
    return langId;
}
exports.commutateSeparator = commutateSeparator;
async function getAffixPathname(dictionariesPathname, lang) {
    const affixPath1 = path_1.default.join(dictionariesPathname, `${lang}.aff`);
    let exists = await fs_extra_1.default.pathExists(affixPath1);
    if (exists) {
        return affixPath1;
    }
    const affixPath2 = path_1.default.join(dictionariesPathname, `${commutateSeparator(lang)}.aff`);
    exists = await fs_extra_1.default.pathExists(affixPath2);
    if (exists) {
        return affixPath2;
    }
    throw new Error(`Cannot find the file ${affixPath1} or the file ${affixPath2}`);
}
exports.getAffixPathname = getAffixPathname;
async function getDicPathname(dictionariesPathname, lang) {
    const dicPath1 = path_1.default.join(dictionariesPathname, `${lang}.dic`);
    let exists = await fs_extra_1.default.pathExists(dicPath1);
    if (exists) {
        return dicPath1;
    }
    const dicPath2 = path_1.default.join(dictionariesPathname, `${commutateSeparator(lang)}.dic`);
    exists = await fs_extra_1.default.pathExists(dicPath2);
    if (exists) {
        return dicPath2;
    }
    throw new Error(`Cannot find the file ${dicPath1} or the file ${dicPath2}`);
}
exports.getDicPathname = getDicPathname;
function spellCheck(api) {
    return async (commandArguments) => {
        const { params } = commandArguments;
        if ((0, param_value_1.paramValue)(params, ['h', 'help'])) {
            displaySpellCheckHelp();
            return;
        }
        const lang = (0, param_value_1.paramValue)(params, ['language', 'l']);
        if (!lang || (0, isEmpty_1.default)(lang)) {
            console.log('Error the Language option is empty');
            displaySpellCheckHelp();
            return;
        }
        let path = (0, param_value_1.paramValue)(params, ['path', 'p']);
        if (!(0, isString_1.default)(path)) {
            const conf = api.getPersistentConf();
            if (conf.path) {
                path = conf.path;
            }
            else {
                console.error('Dictionaries path is empty');
                displaySpellCheckHelp();
                return;
            }
        }
        const lineNumber = (0, param_value_1.paramValue)(params, ['number', 'n']);
        let logFunction = log_wrong_words_1.logColorizedText;
        const affixPath = await getAffixPathname(path, lang);
        const dicPath = await getDicPathname(path, lang);
        const dataPathnameJs = api.resolve.src(`i18n/${lang}/index.js`);
        let exists = await fs_extra_1.default.pathExists(dataPathnameJs);
        if (exists) {
            console.log(`\nchecking the file ${dataPathnameJs}`);
            console.log('--------------------------------------------------------------------------\n');
            if (lineNumber) {
                logFunction = await (0, log_wrong_words_1.getlogWithLineNumber)(dataPathnameJs);
            }
            await (0, check_spell_1.checkSpell)(affixPath, dicPath, dataPathnameJs, logFunction);
        }
        const dataPathnameTs = api.resolve.src(`i18n/${lang}/index.ts`);
        exists = await fs_extra_1.default.pathExists(dataPathnameTs);
        if (exists) {
            console.log(`\nchecking the file ${dataPathnameTs}`);
            console.log('--------------------------------------------------------------------------\n');
            if (lineNumber) {
                logFunction = await (0, log_wrong_words_1.getlogWithLineNumber)(dataPathnameTs);
            }
            await (0, check_spell_1.checkSpell)(affixPath, dicPath, dataPathnameTs, logFunction);
        }
        console.log('\n--------------------------------------------------------------------------');
        console.log('End of spell checking!\n');
    };
}
exports.spellCheck = spellCheck;
//# sourceMappingURL=spellcheck.js.map