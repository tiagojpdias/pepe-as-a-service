import fs from 'fs';
import config from '../../config';
import { logger } from '../utils';

const tagsFile: string = config('bot.tagsFileName');

let tags: Map<string, string[]> = new Map();

function reloadTags(file: string): void {
  const currentDate: string = new Date(Date.now()).toLocaleString('PT');

  try {
    const readFile: string = fs.readFileSync(file, 'utf8');
    const parsedFile: object = JSON.parse(readFile);

    tags = Object.entries(parsedFile).reduce(
      (newMap: Map<string, string>, [key, value]) => {
        newMap.set(key, value);
        return newMap;
      },
      new Map(),
    );

    logger.info(`Tags map recreated @ ${currentDate}`);
  } catch (e) {
    logger.error(e);
  }
}

fs.watch(tagsFile, function listener(event: string, file: string): void {
  switch (event) {
    case 'rename':
    case 'change': {
      reloadTags(file);
      break;
    }
    default: {
      break;
    }
  }
});

reloadTags(tagsFile);

function getTags(): Map<string, string[]> {
  return tags;
}

export { getTags };
