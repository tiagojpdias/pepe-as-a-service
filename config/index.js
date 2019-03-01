const messages = {
  enter: 'bom dia a todos menos a um',
  exit: 'XAU AI _BORDAS_',
};

const activities = {
  enter: 'Pepe as a Service',
  exit: `Screw u guys I'm going home`,
};

const botToken = process.env.BOT_TOKEN || '';
const mainChannelId = process.env.MAIN_CHANNEL_ID || '';
const msgThrottleTime = process.env.MSG_THROTTLE_TIME || 30;
const msgRetryThreshold = process.env.MSG_RETRY_THRESHOLD || 4;

module.exports = {
  messages,
  activities,
  botToken,
  mainChannelId,
  msgThrottleTime,
  msgRetryThreshold,
};
