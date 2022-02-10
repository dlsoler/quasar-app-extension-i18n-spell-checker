import isEmpty from "lodash/isEmpty";
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

export function* valueGenerator(obj: object): Generator<string, null, object | undefined >{
  
  if (!isObject(obj) || isEmpty(obj)) {
    return null;
  }

  const values = Object.values(obj) as [string | object];

  for (const value of values) {
    if (typeof value === 'string') {
      yield value;
    } else if (typeof value === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const gen = valueGenerator(value);
      for (const v of gen) {
        if (isString(v)) {
          yield v;
        }
      }
    } else {
      throw new Error(`Found a value that it is not an object or string: ${value}`);
    }
  }
  return null;
}
