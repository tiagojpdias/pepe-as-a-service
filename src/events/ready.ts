import { Client } from 'discord.js';
import config from '../../config';
import { logger } from '../utils';

const currentDate = new Date(Date.now()).toLocaleString('PT');

async function readyEvent(client: Client) {
  const { user } = client;

  await user.setActivity(config('activities.enter'));
  await user.setStatus('online');

  process.on('SIGINT', async () => {
    const newStatus = await user.setStatus('dnd');
    const newActivity = await user.setActivity(config('activities.exit'));

    if (newStatus && newActivity) {
      process.exit(0);
    }
  });

  logger.info(`Pepe-As-A-Service started @ ${currentDate}`);
}

export default readyEvent;
