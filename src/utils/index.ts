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

function getImage(tag: string): string {
  const urls: string[] = getTags().get(tag) as string[];

  return randomImage(urls);
}

function getReservedImage(tag: string): string {
  const reservedTag: any = getTags().get('__reserved');

  const urls: string[] = reservedTag[tag];

  return randomImage(urls);
}

function getResizedImage(imagePath: string, cb: any) {
  requestInstance.get(imagePath, async (err: any, response: any, body: any) => {
    const resizedImage = await sharp(Buffer.from(body)).resize(
      config('images.height') as number,
      config('images.width') as number,
      { fit: 'fill' },
    );

    cb(resizedImage);
  });
}

export { getImage, getReservedImage, logger, getResizedImage };
