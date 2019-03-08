import request from 'request';
import sharp from 'sharp';
import config from '../../config';
import { getTags } from '../boot';
import logger from './logger';

const requestInstance = request.defaults({ encoding: null });

function randomImage(urls: string[]): string {
  if (!urls) {
    throw Error('No images for this tag');
  }

  const index: number = Math.floor(Math.random() * urls.length);

  return urls[index];
}

function getImage(tag: string): string | void {
  const urls: string[] = getTags().get(tag) as string[];
  try {
    return randomImage(urls);
  } catch (e) {
    logger.error(e);
    throw Error(`Trying to get image for tag ${tag}`);
  }
}

function getReservedImage(tag: string): string | void {
  const reservedTag: any = getTags().get('__reserved');

  const urls: string[] = reservedTag[tag];
  try {
    return randomImage(urls);
  } catch (e) {
    logger.error(e);
    throw Error(`Trying to get reserved image for tag ${tag}`);
  }
}

function getResizedImage(imagePath: string, cb: any): void {
  requestInstance.get(imagePath, async (err: any, response: any, body: any) => {
    if (err) {
      logger.error(err);
    }

    if (body) {
      const resizedImage = await sharp(Buffer.from(body)).resize(null, null, {
        width: config('images.height') as number,
        height: config('images.width') as number,
        fit: config('images.fit') as any,
      });

      cb(resizedImage);
    }
  });
}

export { getImage, getReservedImage, logger, getResizedImage };
