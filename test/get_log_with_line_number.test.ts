import path from 'path';
import { getlogWithLineNumber } from '../ts_src/spell_checker/log_wrong_words';


describe('function getlogWithLineNumber', () => {
  it ('returns the right function', async () => {
    const dataPath = path.join(__dirname, './i18n-files-for-testing/index_1.ts');
    const func = await getlogWithLineNumber(dataPath);
    const result = func('This is a veautiful typo', ['veautiful']);
    expect(typeof result).toBe('string');
    console.log(result);
  });
});