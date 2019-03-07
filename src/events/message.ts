import { Attachment, Message, User } from 'discord.js';
import config from '../../config';
import { getTags } from '../boot';
import { getImage, getReservedImage, logger } from '../utils';

const retries: Map<string, number> = new Map();

/**
 * Handles user retries when cooldown
 *
 * @param author: User
 * @param retryThreshold: Number
 */
function handleRetry(
  author: User,
  retryThreshold: number = config('bot.msgRetryThreshold') as number,
) {
  const authorRetries: number = retries.get(author.id) || 1;
  const retryCount: number = authorRetries + 1;

  retries.set(author.id, retryCount);

  if (retryCount >= retryThreshold * 2) {
    const attachment: Attachment = new Attachment(
      getReservedImage('angryPepe'),
    );

    author.send('**FODA-SE PÁ, NÃO PERCEBESTE A MENSAGEM CRL?!?!**', {
      files: [attachment],
    });

    return;
  }

  if (retryCount >= retryThreshold) {
    author.send(
      `_Borda_, fizeste ${retryCount} pedidos nos últimos ${config(
        'bot.msgThrottleTime',
      ) as number} segundos. Vamos evitar _flood_ no canal, OK?`,
    );
  }
}

/**
 * Throttle user requests to avoid channel flood
 *
 * @param author: User
 * @param callback: Function
 * @param throttleTime: Number
 */
function throttleUser(
  author: User,
  callback: () => void,
  throttleTime: number = config('bot.msgThrottleTime') as number,
): void {
  if (retries.has(author.id)) {
    handleRetry(author);
    throw Error(`Preventing flood from ${author.username}.`);
  }

  setInterval(() => {
    retries.delete(author.id);
  }, throttleTime * 1000);

  retries.set(author.id, 1);

  callback();
}

/**
 * Handles Discord's message event
 *
 * @param message: Message
 */
async function messageEvent(message: Message): Promise<any> {
  const { author, client, content, channel } = message;

  if (author.bot) {
    return;
  }

  const botUsername: string = client.user.toString();

  if (content.startsWith(botUsername)) {
    const allowedTags: string[] = [...getTags().keys()].filter(
      (key: string) => key !== '__reserved',
    );

    const [, tag, ...gibberish]: string[] = content.trim().split(' ');

    if (gibberish.length > 0) {
      const attachment = new Attachment(getReservedImage('angryPepe'));

      try {
        const warned = await author.send(
          '**EI _BORDA_, UMA TAG DE CADA VEZ, OK?!?!**',
          { files: [attachment] },
        );

        if (warned) {
          await author.send(`Tags :: ${allowedTags.join(' , ')}`);
        }

        if (message.deletable) {
          await message.delete();
        }
      } catch (e) {
        logger.warn(e.message);
      }

      return;
    }

    if (!tag || !allowedTags.includes(tag)) {
      try {
        if (message.deletable) {
          const deleted: Message = await message.delete();

          if (deleted) {
            throttleUser(author, async () => {
              author.send(`Tags :: ${allowedTags.join(' , ')}`);
            });
          }
        }
      } catch (e) {
        logger.warn(e.message);
      }

      return;
    }

    try {
      const image: string = getImage(tag);

      throttleUser(
        author,
        async (): Promise<void> => {
          const attachment: Attachment = new Attachment(image);

          try {
            if (message.editable) {
              await message.edit(attachment);
            } else if (message.deletable) {
              await message.delete();
            }

            await channel.send(attachment);
          } catch (e) {
            logger.warn('WARNING :: ', e.message);
          }
        },
      );
    } catch (e) {
      logger.warn(e.message);

      if (message.deletable) {
        await message.delete();
      }
    }
  }
}

export default messageEvent;
