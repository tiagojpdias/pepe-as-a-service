import { Client, ClientUser, Presence } from 'discord.js';
import config from '../../config';
import { logger } from '../utils';

const currentDate: string = new Date(Date.now()).toLocaleString('PT');

async function readyEvent(client: Client) {
  const { user }: Client = client;

  await user.setActivity(config('activities.enter'));
  await user.setStatus('online');

  process.on('SIGINT', async () => {
    const newStatus: ClientUser = await user.setStatus('dnd');
    const newActivity: Presence = await user.setActivity(
      config('activities.exit'),
    );

    if (newStatus && newActivity) {
      process.exit(0);
    }
  });

  logger.info(`Pepe-As-A-Service started @ ${currentDate}`);
}

export default readyEvent;
