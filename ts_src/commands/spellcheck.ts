import path from 'path';
import fse from 'fs-extra';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

import { API, CommandFunction, CommandFunctionArguments, ExtensionConf } from './types';
import { paramValue } from './param_value';
import { checkSpell } from '../spell_checker/check_spell';
import { logColorizedText, getlogWithLineNumber } from '../spell_checker/log_wrong_words';

export function displaySpellCheckHelp () {
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

export function commutateSeparator(langId: string) {
  if (langId.includes('-')) {
    return langId.replace('-', '_');
  }
  if (langId.includes('_')) {
    return langId.replace('-', '_');
  }
  return langId;
}

export async function getAffixPathname (dictionariesPathname: string, lang: string): Promise<string> {
  const affixPath1 = path.join(dictionariesPathname, `${lang}.aff`);
  let exists = await fse.pathExists(affixPath1);
  if (exists) {
    return affixPath1;
  }
  const affixPath2 = path.join(dictionariesPathname, `${commutateSeparator(lang)}.aff`);
  exists = await fse.pathExists(affixPath2);
  if (exists) {
    return affixPath2;
  }
  throw new Error (`Cannot find the file ${affixPath1} or the file ${affixPath2}`);
}

export async function getDicPathname (dictionariesPathname: string, lang: string): Promise<string> {
  const dicPath1 = path.join(dictionariesPathname, `${lang}.dic`);
  let exists = await fse.pathExists(dicPath1);
  if (exists) {
    return dicPath1;
  }
  const dicPath2 = path.join(dictionariesPathname, `${commutateSeparator(lang)}.dic`);
  exists = await fse.pathExists(dicPath2);
  if (exists) {
    return dicPath2;
  }
  throw new Error (`Cannot find the file ${dicPath1} or the file ${dicPath2}`);
}

export function spellCheck(api: API): CommandFunction {
  return async (commandArguments: CommandFunctionArguments): Promise<unknown> => {
    const { params } = commandArguments;
    
    if (paramValue(params, ['h', 'help'])) {
      displaySpellCheckHelp();
      return;
    }

    const lang = paramValue(params, ['language', 'l']);
    if (!lang || isEmpty(lang)){
      console.log('Error the Language option is empty');
      displaySpellCheckHelp();
      return;
    }

    let path = paramValue(params, ['path', 'p']);

    if (!isString(path)) {
      // Try to get the path from persistent configuration
      const conf = api.getPersistentConf() as ExtensionConf;
      if (conf.path) {
        path = conf.path;
      } else {
        console.error('Dictionaries path is empty');
        displaySpellCheckHelp();
        return;
      }
    }

    const lineNumber = paramValue(params, ['number', 'n']);
    let logFunction = logColorizedText;

    const affixPath = await getAffixPathname(path, lang);
    const dicPath = await getDicPathname(path, lang);

    const dataPathnameJs = api.resolve.src(`i18n/${lang}/index.js`);
    let exists = await fse.pathExists(dataPathnameJs);
    if (exists) {
      console.log(`\nchecking the file ${dataPathnameJs}`);
      console.log('--------------------------------------------------------------------------\n');
      if (lineNumber) {
        logFunction = await getlogWithLineNumber(dataPathnameJs);
      }
      await checkSpell(affixPath, dicPath, dataPathnameJs, logFunction);
    }

    const dataPathnameTs = api.resolve.src(`i18n/${lang}/index.ts`);
    exists = await fse.pathExists(dataPathnameTs);
    if (exists) {
      console.log(`\nchecking the file ${dataPathnameTs}`);
      console.log('--------------------------------------------------------------------------\n');
      if (lineNumber) {
        logFunction = await getlogWithLineNumber(dataPathnameTs);
      }
      await checkSpell(affixPath, dicPath, dataPathnameTs, logFunction);
    }
    console.log('\n--------------------------------------------------------------------------');
    console.log('End of spell checking!\n');
    
  };
}