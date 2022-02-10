import fs from 'fs';
import isEmpty from 'lodash/isEmpty';
import * as ts from 'typescript';
import { valueGenerator } from './value_generator';

const fsPromises = fs.promises;

export async function transpileFile(pathname: string): Promise<object> {
  if (isEmpty(pathname) || !fs.existsSync(pathname)) {
    throw new Error(`Cannot find the data file: ${pathname}`);
  } 
  // Read the i18n ES6 source code
  const source = await fsPromises.readFile(pathname);
  // Transpile the code using typescript
  const result = await ts.transpileModule(source.toString(), { compilerOptions: { module: ts.ModuleKind.CommonJS }});
  // eval the transpiled code
  const obj = eval(result.outputText);
  return obj;
}

export async function dataGenerator(pathname: string): Promise<Generator<string, null, object | undefined >> {
  const dataObj = await transpileFile(pathname);
  // The result of eval is in exports.default
  return valueGenerator(dataObj);
}