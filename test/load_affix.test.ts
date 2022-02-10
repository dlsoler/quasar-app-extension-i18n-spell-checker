import path from 'path';
import { loadAffix } from '../ts_src/spell_checker/spell_checker';


describe('function loadAffix', () => {

  it('rejects if the pathname is wrong', async () => {
    expect.assertions(2);
    const wrongFilename = path.join(__dirname, 'dictionaries/es_ARX.aff');
    await expect(loadAffix(wrongFilename)).rejects.toThrow(Error);

    const directory = path.join(__dirname, 'dictionaries');
    await expect(loadAffix(directory)).rejects.toThrow(Error);

  });

  it('resolves the dictionary with the right pathname', async () => {
    const pathname = path.join(__dirname, 'dictionaries/es_AR.aff');
    const dict = await loadAffix(pathname);
    expect(dict instanceof Buffer).toBeTruthy();
  });
});