# discord-ez-bot

Super simple Discord bot framework, based on [discord.js](https://discord.js.org).

Inspired by Symfony's [Webpack Encore](https://symfony.com/doc/current/frontend/encore/simple-example.html),
you can easily create your bot using a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface).

## Features

- written in TypeScript - includes `.d.ts` files
- very lightweight
- extremely easy to use
- not a different API wrapper - it can use all the features of discord.js
- all builder methods are documented

## Example

Install the package:

```bash
# if you use npm
npm install discord-ez-bot

# if you use yarn
yarn add discord-ez-bot
```

Now, bring your bot to life:

```javascript
// import the builder
const { DiscordBotBuilder } = require('discord-ez-bot');

// create a bot builder
const bot = new DiscordBotBuilder('?') // define the command prefix
  .whenReady(() => console.log('Ready')) // execute a callback when the bot becomes usable
  .cmd('hello', msg => msg.reply('Hi there!')) // easily handle commands
  .cmd('args', (msg, args) => msg.reply(`You gave me: ${args}`)) // command arguments are supported too
  .on('typingStart', (chan, user) => chan.send(`${user.username} is typing!`)) // and raw `on` events as well
  .build(); // magically create an instance of `Discord.Client`!

// at this point, `bot` can use all discord.js functionalities;
// log in with a bot token, just like you usually would!
bot.login('token');
```

While executing this script, your bot should boot and start responding to commands,
and that's just literally in less than 10 lines of code - how cool is that!?
