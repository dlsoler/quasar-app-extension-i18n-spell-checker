/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

import { API } from './commands/types';
import { spellCheck } from './commands/spellcheck';
import { saveDictPath } from './commands/save_dict_path';

module.exports = function (api: API) {
  /**
   * @param {string} commandName
   * @param {function} fn
   *   ({ args: [ string, ... ], params: {object} }) => ?Promise
   */
  api.registerCommand('spellcheck', (spellCheck(api)));
  api.registerCommand('save-dictionary-path', (saveDictPath(api)));
};


