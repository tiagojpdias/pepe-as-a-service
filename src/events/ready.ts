import {
  Attachment,
  Client,
  ClientUser,
  Presence,
  TextChannel,
} from 'discord.js';
import config from '../../config';
import { getReservedImage, logger } from '../utils';
import { MessageType, PresenceStatusType } from '../utils/enums';

const currentDate: string = new Date(Date.now()).toLocaleString('PT');
const messagesEnabled: boolean = config('messages.enabled') as boolean;

async function readyEvent(client: Client) {
  const { user }: Client = client;

  await user.setActivity(config('activities.enter') as string);
  await user.setStatus(PresenceStatusType.online);

  if (messagesEnabled) {
    displayMessage(client, MessageType.enter);
  }

  process.on('SIGINT', async () => {
    const newStatus: ClientUser = await user.setStatus(PresenceStatusType.dnd);
    const newActivity: Presence = await user.setActivity(config(
      'activities.exit',
    ) as string);

    if (messagesEnabled) {
      displayMessage(client, MessageType.exit);
    }

    if (newStatus && newActivity) {
      process.exit(0);
    }
  });

  logger.info(`Pepe-As-A-Service started @ ${currentDate}`);
}

function displayMessage(client: Client, type: MessageType): void {
  const mainChannelId: string = config('bot.mainChannelId') as string;
  const channel: TextChannel = client.channels.get(
    mainChannelId,
  ) as TextChannel;

  switch (type) {
    case MessageType.enter: {
      const helloImage = new Attachment(getReservedImage('hello') as string);

      channel.send(config('messages.enter'), {
        files: [helloImage],
      });
      break;
    }
    case MessageType.exit: {
      const goodbyeImage = new Attachment(getReservedImage(
        'goodbye',
      ) as string);

      channel.send(config('messages.leave'), {
        files: [goodbyeImage],
      });
    }
    default: {
      break;
    }
  }
}

export default readyEvent;
