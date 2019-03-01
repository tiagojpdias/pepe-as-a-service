const config = {
  messages: {
    enter: 'bom dia a todos menos a um',
    exit: 'XAU AI _BORDAS_',
  },

  activities: {
    enter: 'Pepe as a Service',
    exit: `Screw u guys I'm going home`,
  },

  botToken: process.env.BOT_TOKEN || '',
  mainChannelId: process.env.MAIN_CHANNEL_ID || '',
  msgThrottleTime: process.env.MSG_THROTTLE_TIME || 30,
  msgRetryThreshold: process.env.MSG_RETRY_THRESHOLD || 4,
};

module.exports = config;
