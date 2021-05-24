import Discord from 'discord.js';

import { CommandParser } from './parser';

type Callback = () => any;
type CommandCallback = (msg: Discord.Message, args?: string[]) => void;
type Event = keyof Discord.ClientEvents;

/**
 * The main bot builder.
 */
export class DiscordBotBuilder {
  private parser: CommandParser;

  private events: Map<Event, Callback> = new Map();
  private commands: Map<string, CommandCallback> = new Map();

  constructor(prefix: string = '!') {
    this.parser = new CommandParser(prefix);
  }

  /**
   * Defines the callback that is executed when the bot
   * receives the given event.
   */
  on(event: Event, callback: Callback): DiscordBotBuilder {
    this.events.set(event, callback);

    return this;
  }

  /**
   * Registers a command that performs the given `callback`.
   */
  cmd(command: string, callback: CommandCallback): DiscordBotBuilder {
    this.commands.set(command, callback);

    return this;
  }

  /**
   * Defines what is done when the bot is ready.
   * 
   * This method is essentially a wrapper for the `on` method.
   */
  whenReady(callback: Callback): DiscordBotBuilder {
    this.on('ready', callback);

    return this;
  }

  /**
   * Builds a Discord.js's `Discord.Client` instance
   * from given properties.
   */
  build(): Discord.Client {
    const bot = new Discord.Client();

    this.events.forEach((cb, e) => {
      bot.on(e, cb);
    });

    // handle messages
    bot.on('message', msg => {
      const parsed = this.parser.parse(msg.content);

      if (!parsed || msg.author.bot) {
        return;
      }

      const cb = this.commands.get(parsed[0]);

      // check if the command is defined
      if (cb) {
        cb(msg, parsed.slice(1));
      }
    });

    return bot;
  }
}
