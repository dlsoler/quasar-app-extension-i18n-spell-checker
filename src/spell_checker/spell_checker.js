"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpellChecker = exports.loadDictionary = exports.loadAffix = void 0;
const fs_1 = require("fs");
const nodehun_1 = require("nodehun");
async function loadAffix(affixPathname) {
    try {
        const stat = await fs_1.promises.stat(affixPathname);
        if (stat.isFile()) {
            const affix = await fs_1.promises.readFile(affixPathname);
            return affix;
        }
        throw new Error(`${affixPathname} is not a file`);
    }
    catch (err) {
        throw new Error(`Error reading Affix file ${affixPathname}: ${err}`);
    }
}
exports.loadAffix = loadAffix;
async function loadDictionary(dictionaryPathname) {
    try {
        const stat = await fs_1.promises.stat(dictionaryPathname);
        if (stat.isFile()) {
            const dictionary = await fs_1.promises.readFile(dictionaryPathname);
            return dictionary;
        }
        throw new Error(`${dictionaryPathname} is not a file`);
    }
    catch (err) {
        throw new Error(`Error reading dictionary file ${dictionaryPathname}: ${err}`);
    }
}
exports.loadDictionary = loadDictionary;
async function getSpellChecker(affixPathname, dictionaryPathname) {
    const affix = await loadAffix(affixPathname);
    const dictionary = await loadDictionary(dictionaryPathname);
    const nodehun = new nodehun_1.Nodehun(affix, dictionary);
    return nodehun;
}
exports.getSpellChecker = getSpellChecker;
//# sourceMappingURL=spell_checker.js.map