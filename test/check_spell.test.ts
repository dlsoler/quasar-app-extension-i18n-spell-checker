import path from 'path';
import { checkSpell } from '../ts_src/spell_checker/check_spell';
import { logColorizedText, getlogWithLineNumber } from '../ts_src/spell_checker/log_wrong_words';

describe ('function checkSpell', () =>{

  it ('check spell successfully', async () => {
    const affixPathname = path.join(__dirname, 'dictionaries/en_US.aff');
    const dictionaryPathname = path.join(__dirname, 'dictionaries/en_US.dic');
    const dataPathname = path.join(__dirname, './i18n-files-for-testing/index_1.ts');
    await expect(checkSpell(affixPathname, dictionaryPathname, dataPathname, logColorizedText)).resolves.toBeUndefined();
  });

  it ('check spell successfully with line number', async () => {
    const affixPathname = path.join(__dirname, 'dictionaries/en_US.aff');
    const dictionaryPathname = path.join(__dirname, 'dictionaries/en_US.dic');
    const dataPathname = path.join(__dirname, './i18n-files-for-testing/index_1.ts');
    const logFunction = await getlogWithLineNumber(dataPathname);
    await expect(checkSpell(affixPathname, dictionaryPathname, dataPathname, logFunction)).resolves.toBeUndefined();
  });
});