const config = require('../../config');

const currentDate = new Date(Date.now()).toLocaleString('PT');

module.exports = async client => {
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

  console.log(`READY :: Pepe-As-A-Service started @ ${currentDate}`);
};
