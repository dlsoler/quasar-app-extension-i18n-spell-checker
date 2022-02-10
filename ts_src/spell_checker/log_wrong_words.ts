import chalk from 'chalk';
import fse from 'fs-extra';

export type LogFunction = (text: string, words: Array<string>) => string;

export function logColorizedText(text: string, words: Array<string>): string {
  let colorizedText: string = text;
  words.forEach((word) => {
    colorizedText = colorizedText.replace(word, chalk.red(word));
  });
  return colorizedText;
}


export async function getlogWithLineNumber(dataPathname: string): Promise<LogFunction> {
  const lines = (await fse.readFile(dataPathname)).toString().split('\n');

  return function(text: string, words: Array<string>): string {
    const lineNumber = lines.findIndex((line) => line.includes(text)) + 1;
    return `line #${lineNumber}: ${logColorizedText(text, words)}`;
  };
}