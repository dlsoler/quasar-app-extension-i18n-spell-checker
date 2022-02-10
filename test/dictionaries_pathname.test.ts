import path from 'path';
import fse from 'fs-extra';
import { getAffixPathname, getDicPathname } from '../ts_src/commands/spellcheck';


describe('function getAffixPathname', () => {
  it ('return the right pathname', async () => {
    const dictionariesPath = path.join(__dirname, './dictionaries');
    let pathname = await getAffixPathname(dictionariesPath, 'en_US');
    let  exists = await fse.pathExists(pathname);
    expect(exists).toBeTruthy();

    pathname = await getAffixPathname(dictionariesPath, 'en-US');
    exists = await fse.pathExists(pathname);
    expect(exists).toBeTruthy();
    expect(path.extname(pathname)).toBe('.aff');

  });
});


describe('function getDicPathname', () => {
  it ('return the right pathname', async () => {
    const dictionariesPath = path.join(__dirname, './dictionaries');
    let pathname = await getDicPathname(dictionariesPath, 'en_US');
    let  exists = await fse.pathExists(pathname);
    expect(exists).toBeTruthy();

    pathname = await getDicPathname(dictionariesPath, 'en-US');
    exists = await fse.pathExists(pathname);
    expect(exists).toBeTruthy();
    expect(path.extname(pathname)).toBe('.dic');
  });
});