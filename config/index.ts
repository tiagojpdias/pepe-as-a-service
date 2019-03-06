const modules: any = {};

function config(configPath: string): any {
  if (!configPath) {
    return undefined;
  }

  const [fileName, property]: string[] = configPath.split('.');

  const module: any = modules[fileName];

  if (!module) {
    const importedModule: any = require(`./${fileName}`).default;
    modules[fileName] = importedModule;

    return importedModule[property];
  }

  return module[property];
}

export default config;
