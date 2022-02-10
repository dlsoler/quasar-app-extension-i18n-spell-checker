import chalk from 'chalk';
import { logColorizedText } from '../ts_src/spell_checker/log_wrong_words';


describe('function logColorizedText', () => {
  it('returns the right text', () => {
    const text = 'RGB means Red, Green and Blue';
    const words = ['Red', 'Green', 'Blue'];

    const result = logColorizedText(text, words);
    expect(result).toBe(`RGB means ${chalk.red('Red')}, ${chalk.red('Green')} and ${chalk.red('Blue')}`);
  });
});

