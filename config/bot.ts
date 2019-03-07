export default {
  /**
   * Main channel to which bot will send generic messages
   */
  mainChannelId: process.env.MAIN_CHANNEL_ID || '',

  /**
   * Amount of retries the user can trigger until receiving warnings
   */
  msgRetryThreshold: process.env.MSG_RETRY_THRESHOLD || 4,

  /**
   * Amount of time user will be throttled to avoid flood
   */
  msgThrottleTime: process.env.MSG_THROTTLE_TIME || 30,

  /**
   * Bot's token to allow connection to server
   */
  token: process.env.BOT_TOKEN || '',

  /**
   * Tags filename to load
   */
  tagsFileName: 'tags.json',
};
