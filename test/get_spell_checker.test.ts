import path from 'path';
import { Nodehun } from 'nodehun';
import { getSpellChecker } from '../ts_src/spell_checker/spell_checker';


describe('function getSpellChecker', () => {

  it('returns a spellchecker', async () => {
    const esAffixPathname = path.join(__dirname, 'dictionaries/es_AR.aff');
    const esDictionaryPathname = path.join(__dirname, 'dictionaries/es_AR.dic');
    const esSpellChecker = await getSpellChecker(esAffixPathname, esDictionaryPathname);
    expect(esSpellChecker).toBeInstanceOf(Nodehun);
    expect(await esSpellChecker.spell('vaca')).toBeTruthy();
    expect(await esSpellChecker.spell('vacca')).toBeFalsy();
    

    const enAffixPathname = path.join(__dirname, 'dictionaries/en_US.aff');
    const enDictionaryPathname = path.join(__dirname, 'dictionaries/en_US.dic');
    const enSpellChecker = await getSpellChecker(enAffixPathname, enDictionaryPathname);
    expect(enSpellChecker).toBeInstanceOf(Nodehun);
    expect(await enSpellChecker.spell('word')).toBeTruthy();
    expect(await enSpellChecker.spell('wordp')).toBeFalsy();

  });
});