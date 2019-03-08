const modules: any = {};

function config(configPath: string): number | string | boolean | undefined {
  if (!configPath) {
    return undefined;
  }

  const [fileName, property]: string[] = configPath.split('.');

  const module: any = modules[fileName];

  if (!module) {
    try {
      const importedModule: any = require(`./${fileName}`).default;
      modules[fileName] = importedModule;

      return importedModule[property];
    } catch {
      return undefined;
    }
  }

  return module[property];
}

export default config;
