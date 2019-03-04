module.exports = {
  token: process.env.BOT_TOKEN || '',
  mainChannelId: process.env.MAIN_CHANNEL_ID || '',
  msgThrottleTime: process.env.MSG_THROTTLE_TIME || 30,
  msgRetryThreshold: process.env.MSG_RETRY_THRESHOLD || 4,
};
