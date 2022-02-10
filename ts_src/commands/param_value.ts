import { has, isString, isArray, isUndefined, isEmpty } from 'lodash';
import { CommandParams, CommandParamName } from './types';


/**
 * Returns a param value by its name
 * @param params parameter object
 * @param paramName parameter name
 * @returns 
 */
export function paramValue(params: CommandParams, paramName: CommandParamName): string | undefined {

  if (isUndefined(paramName)) return undefined;

  if (isString(paramName)) return params[paramName];

  if(isArray(paramName) && !isEmpty(paramName)) {
    for (const key of paramName) {
      if (has(params, key)) {
        return params[key];
      }
    }
  }
  return undefined;

}