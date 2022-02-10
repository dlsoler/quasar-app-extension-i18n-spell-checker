"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpell = void 0;
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const spell_checker_1 = require("./spell_checker");
const data_from_source_code_1 = require("./data_from_source_code");
const tokenize_1 = require("./tokenize");
async function checkSpell(affixPathname, dictionaryPathname, dataPathname, logFunction) {
    const spellChecker = await (0, spell_checker_1.getSpellChecker)(affixPathname, dictionaryPathname);
    const dataSource = await (0, data_from_source_code_1.dataGenerator)(dataPathname);
    for (const data of dataSource) {
        if (data === null) {
            continue;
        }
        const tokens = (0, tokenize_1.tokenizeWords)(data);
        const wrongWords = [];
        for (let i = 0; i < tokens.length; i += 1) {
            if (tokens[i].tag === 'alien') {
                wrongWords.push(tokens[i].value);
                continue;
            }
            if (tokens[i].tag === 'number') {
                continue;
            }
            if (tokens[i].tag === 'word') {
                const word = tokens[i].value;
                const isOk = await spellChecker.spell(word);
                if (!isOk) {
                    wrongWords.push(word);
                }
            }
            else {
                wrongWords.push(`ERROR:: Wrong Token detected: tag = "${tokens[i].tag}", value = "${tokens[i].value}"`);
            }
        }
        if (!(0, isEmpty_1.default)(wrongWords)) {
            console.log(logFunction(data, wrongWords));
        }
    }
}
exports.checkSpell = checkSpell;
//# sourceMappingURL=check_spell.js.map