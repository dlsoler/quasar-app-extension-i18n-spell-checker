import path from 'path';
import { dataGenerator } from  '../ts_src/spell_checker/data_from_source_code';


describe('function dataGenerator', () => {
  it('returns the right Generator', async () => {
    const pathname = path.join(__dirname, './i18n-files-for-testing/index_1.ts');
    const generator: Generator<string, null, object | undefined > = await dataGenerator(pathname);
    let item = generator.next();
    expect(item.value).toBe('Action failed');
    expect(item.done).toBeFalsy();
    item = generator.next();
    expect(item.value).toBe('Action was successful');
    expect(item.done).toBeFalsy();
    item = generator.next();
    expect(item.value).toBe('Ok');
    expect(item.done).toBeFalsy();
    item = generator.next();
    expect(item.value).toBe('Reject');
    expect(item.done).toBeFalsy();
    item = generator.next();
    expect(item.value).toBe('This has a mispelling');
    expect(item.done).toBeFalsy();
    item = generator.next();
    expect(item.value).toBe('This is a veautiful typo');
    expect(item.done).toBeFalsy();
    item = generator.next();
    expect(item.done).toBeTruthy();
  });
});