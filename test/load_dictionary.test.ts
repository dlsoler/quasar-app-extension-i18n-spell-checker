import path from 'path';
import { loadDictionary } from '../ts_src/spell_checker/spell_checker';


describe('function loadDictionary', () => {

  it('rejects if the pathname is wrong', async () => {
    expect.assertions(2);
    const wrongFilename = path.join(__dirname, 'dictionaries/es_ARX.dic');
    await expect(loadDictionary(wrongFilename)).rejects.toThrow(Error);

    const directory = path.join(__dirname, 'dictionaries');
    await expect(loadDictionary(directory)).rejects.toThrow(Error);

  });

  it('resolves the dictionary with the right pathname', async () => {
    const pathname = path.join(__dirname, 'dictionaries/es_AR.dic');
    const dict = await loadDictionary(pathname);
    expect(dict instanceof Buffer).toBeTruthy();
  });
});