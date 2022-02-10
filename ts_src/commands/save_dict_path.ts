
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

import { API, CommandFunction,CommandFunctionArguments, ExtensionConf } from './types';

import { paramValue } from './param_value';


export function displaySaveDictPathHelp () {
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

export function saveDictPath(api: API): CommandFunction {

  return async (commandArguments: CommandFunctionArguments): Promise<unknown> => {
    const dicPath = paramValue(commandArguments.params, ['p', 'path']);


    const cfg = api.getPersistentConf() as ExtensionConf;
    if (isString(dicPath) && !isEmpty(dicPath)) {
      api.mergePersistentConf({ path: dicPath });
    }

 

    if (cfg.path) {
      console.log('Current dictionaries directory pathname is: ', cfg.path);
    } else {
      console.log('There is no saved dictionaries directory path');
    }

    displaySaveDictPathHelp();
    return;
  };

}