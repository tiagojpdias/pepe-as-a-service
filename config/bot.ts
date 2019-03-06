export default {
  mainChannelId: process.env.MAIN_CHANNEL_ID || '',
  msgRetryThreshold: process.env.MSG_RETRY_THRESHOLD || 4,
  msgThrottleTime: process.env.MSG_THROTTLE_TIME || 30,
  token: process.env.BOT_TOKEN || '',
  tagsFileName: 'tags.json',
};
