# Pepe as a Service

[![Build Status](https://travis-ci.com/tiagojpdias/pepe-as-a-service.svg?branch=master)](https://travis-ci.com/tiagojpdias/pepe-as-a-service)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e378655234fa43cb93d1fd4f84b346e5)](https://app.codacy.com/app/tiagojpdias/pepe-as-a-service?utm_source=github.com&utm_medium=referral&utm_content=tiagojpdias/pepe-as-a-service&utm_campaign=Badge_Grade_Dashboard)
[![Pepe Approved](https://img.shields.io/badge/World%20Pepe%20Association-approved-brightgreen.svg)](https://img.shields.io/badge/World%20Pepe%20Association-approved-brightgreen.svg)

# Installation

Before anything else, install the dependencies:

```sh
yarn install
```

or for those who prefer `npm`:

```sh
npm install
```

# Configuration

After installing the dependencies, it's time for a quick configuration.

Create a `.env` file in the project root.

```sh
cp .env_example .env
```

Add and replace values where needed:

```env
#
# Discord bot token
#
BOT_TOKEN=<the bot token you are going to use>

#
# The channel to where generic messages (Hello/Goodbye) should be sent
#
MAIN_CHANNEL_ID=<the id of the Discord channel you want to use>

#
# Time (in seconds) the bot should ignore requests from users
#
MSG_THROTTLE_TIME=30

#
# The number of retries before sending a direct message to insistent users
#
MSG_RETRY_THRESHOLD=3
```

# Running

If you went through the previous steps successfully, you should now be able to run **Pepe as a Service**™ with the following command:

```sh
npm start
```

You should see an output similar to this:

```sh
info: Tags map recreated @ 3/6/2019, 6:56:47 PM
info: Pepe-As-A-Service started @ 3/6/2019, 6:56:47 PM
```

That's it!
