import isEmpty from 'lodash/isEmpty';
import { getSpellChecker } from "./spell_checker";
import { dataGenerator} from './data_from_source_code';
import { tokenizeWords } from "./tokenize";
import { LogFunction } from "./log_wrong_words";


export async function checkSpell(affixPathname: string, dictionaryPathname: string, dataPathname: string, logFunction: LogFunction): Promise<void> {
  const spellChecker = await getSpellChecker(affixPathname, dictionaryPathname);
  const dataSource = await dataGenerator(dataPathname);
  for (const data of dataSource) {
    if (data === null) {
      continue;
    }

    const tokens = tokenizeWords(data);
    const wrongWords: Array<string> = [];
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
      } else {
        wrongWords.push(`ERROR:: Wrong Token detected: tag = "${tokens[i].tag}", value = "${tokens[i].value}"`);
      }
    }
    if (!isEmpty(wrongWords)) {
      console.log(logFunction(data, wrongWords));
    }
  }
}