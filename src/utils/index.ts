import { getTags } from '../boot';
import logger from './logger';

function randomImage(urls: string[]): string {
  if (!urls) {
    throw Error('No images for this tag');
  }

  const index: number = Math.floor(Math.random() * urls.length);

  return urls[index];
}

function getImage(tag: string): string {
  const urls: string[] = getTags().get(tag) as string[];

  return randomImage(urls);
}

function getReservedImage(tag: string): string {
  const reservedTag: any = getTags().get('__reserved');

  const urls: string[] = reservedTag[tag];

  return randomImage(urls);
}

export { getImage, getReservedImage, logger };
