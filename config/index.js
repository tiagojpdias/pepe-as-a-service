const fs = require('fs');

const modules = {};

function config(configPath) {
  if (!configPath) {
    return undefined;
  }

  const [fileName, ...property] = configPath.split('.');

  return modules[fileName][property];
}

function loadModules(modulePath) {
  const files =fs.readdirSync(modulePath);
  const filesToLoad = files.filter(file => !file.startsWith('index'));

  filesToLoad.forEach(file => {
    const [fileName] = file.split('.');

    // eslint-disable-next-line import/no-dynamic-require
    // eslint-disable-next-line global-require
    modules[fileName] = require(`./${fileName}`);
  });
}

loadModules(__dirname);

module.exports = config;
