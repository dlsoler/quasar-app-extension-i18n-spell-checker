import { promises } from 'fs';
import { Nodehun } from 'nodehun';

export async function loadAffix(affixPathname: string): Promise<Buffer> {
  try {
    const stat = await promises.stat(affixPathname);
    if(stat.isFile()) {
      const affix: Buffer = await promises.readFile(affixPathname);
      return affix;
    }
    throw new Error(`${affixPathname} is not a file`);
  } catch(err) {
    throw new Error(`Error reading Affix file ${affixPathname}: ${err}`);
  }
}

export async function loadDictionary(dictionaryPathname: string): Promise<Buffer> {
  try {
    const stat = await promises.stat(dictionaryPathname);
    if(stat.isFile()) {
      const dictionary: Buffer = await promises.readFile(dictionaryPathname);
      return dictionary;
    }
    throw new Error(`${dictionaryPathname} is not a file`);
  } catch(err) {
    throw new Error(`Error reading dictionary file ${dictionaryPathname}: ${err}`);
  }
}

export async function getSpellChecker(affixPathname: string, dictionaryPathname: string): Promise<Nodehun> {
  const affix = await loadAffix(affixPathname);
  const dictionary = await loadDictionary(dictionaryPathname);
  const nodehun = new Nodehun(affix, dictionary);
  return nodehun;
}