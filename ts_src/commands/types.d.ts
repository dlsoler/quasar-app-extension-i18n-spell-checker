export interface ResolvePath {
  app(path: string): string;
  src(path: string): string;
  pwa(path: string): string;
  ssr(path: string): string;
  cordova(path: string): string;
  electron(path: string): string;
}

export interface ChainWebpackCallback {
  (chain: unknown, { isClient: boolean, isServer: boolean}, api: API): undefined;
}

export interface ExtendConfCallback {
  (cfg: unknown, ctx: unknown): undefined;
}

export interface ExtendWebpackCallback {
  (cfg: unknown, invoke: unknown, {isClient: boolean, isServer: boolean}): undefined;
}

export interface ChainWebpackMainElectronProcessCallback {
  (chain: unknown, { isClient: boolean, isServer: boolean }, api: unknown): undefined;
}

export type CommandParamName = Array<string> | string | undefined;

export interface CommandParams {
  h: boolean;
  help: boolean;
  l?: string;
  language?: string;
  path?: string;
  p?: string;
  [key: string]: string;
}

export interface CommandFunctionArguments {
  args: Array<string>;
  params: CommandParams;
}

export interface CommandFunction {
  (obj: CommandFunctionArguments): Promise<unknown>;
}

export interface API {
  appDir: string;
  chainWebpack(callback: ChainWebpackCallback): undefined;
  chainWebpackMainElectronProcess(callaback: ChainWebpackMainElectronProcessCallback);
  compatibleWith(packageName: string, semverCondition: string);
  ctx: unknown;
  extendWebpack(callback: ExtendWebpackCallback);
  extendQuasarConf(callback: ExtendConfCallback);
  extId: string;
  getPackageVersion(packageName: string): string | undefined;
  getPersistentConf(): unknown;
  hasExtension(extId: string): boolean;
  hasPackage(packageName: string, semverCondition: string): boolean;
  mergePersistentConf(cfg: unknown): void;
  prompts: unknown;
  registerCommand(commandName: string, commandFunction: CommandFunction);
  resolve: ResolvePath;
}

export interface ExtensionConf {
  path?: string;
}
