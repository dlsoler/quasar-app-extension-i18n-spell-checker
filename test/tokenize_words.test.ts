import WinkTokenizer from 'wink-tokenizer';
import { tokenizeWords } from '../ts_src/spell_checker/tokenize';


describe('function tokenizeWords', () => {

  it('returns no token when the string is empty', () => {
    const result: Array<WinkTokenizer.Token> = tokenizeWords('');
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBe(0);
  });

  it('returns the right tokens', () => {
    const text1 = 'Hello there! 33';
    const result: Array<WinkTokenizer.Token> = tokenizeWords(text1);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBe(4);
    expect(result[0].value).toBe('Hello');
    expect(result[0].tag).toBe('word');

    expect(result[1].value).toBe('there');
    expect(result[1].tag).toBe('word');

    expect(result[2].value).toBe('!');
    expect(result[2].tag).toBe('alien');

    expect(result[3].value).toBe('33');
    expect(result[3].tag).toBe('number');

  });
});