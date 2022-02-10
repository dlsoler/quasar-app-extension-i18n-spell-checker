import path from 'path';
import { transpileFile } from '../ts_src/spell_checker/data_from_source_code';


interface TestingObj {
  accept?: string;
  cancel?: string;
}

describe('function transpileFile', () => {

  it('returns an Object from typescript', async () => {
    const pathname = path.join(__dirname, './i18n-files-for-testing/index_1.ts');
    const obj = await transpileFile(pathname) as TestingObj;
    expect(obj).toBeInstanceOf(Object);
    expect(obj.accept).toBe('Ok');
    expect(obj.cancel).toBe('Reject');
  });

  it('returns an Object from javascript', async () => {
    const pathname = path.join(__dirname, './i18n-files-for-testing/index_1.js');
    const obj = await transpileFile(pathname) as TestingObj;
    expect(obj).toBeInstanceOf(Object);
    expect(obj.accept).toBe('Ok');
    expect(obj.cancel).toBe('Reject');
  });

});