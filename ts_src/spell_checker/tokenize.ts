import isEmpty from 'lodash/isEmpty';
import WinkTokenizer from 'wink-tokenizer';
import { stripHtml } from 'string-strip-html';

const tokenizer = new WinkTokenizer();

// Ignore the most of types of tokens
tokenizer.defineConfig({
  word: true,
  currency: false,
  email: false,
  emoji: false,
  emoticon: false,
  hashtag: false,
  number: true,
  ordinal: false,
  punctuation: false,
  symbol: false,
  time: false,
  mention: false,
  url: false
});

const variableRegExp = new RegExp('(%{[^}]+})', 'ig');

export function removeTemplateVariables(text: string): string {
  if (isEmpty(text)) {
    return '';
  }
  const result = text.replace(variableRegExp, '');
  return result;
}

export function removeHTMLTags(text: string): string {
  if (isEmpty(text)) {
    return '';
  }
  return stripHtml(text).result;
}

export function tokenizeWords(text: string): Array<WinkTokenizer.Token> {

  if (isEmpty(text)) {
    return [];
  }

  // Remove i18n template variables
  const textWithoutVariables = removeTemplateVariables(text);
  
  // Remove HTML Tags
  const textWithoutHTML = removeHTMLTags(textWithoutVariables);

  const  tokens: Array<WinkTokenizer.Token> =  tokenizer.tokenize(textWithoutHTML);
  return tokens;
}
