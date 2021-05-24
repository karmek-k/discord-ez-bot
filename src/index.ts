import Discord from 'discord.js';

import { CommandParser } from './parser';

type Callback = () => any;
type CommandCallback = (args: string[]) => void;
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
   * Builds a Discord.js's `Discord.Client` instance
   * from given properties.
   */
  build(): Discord.Client {
    const bot = new Discord.Client();

    this.events.forEach((cb, e) => {
      bot.on(e, cb);
    });

    return bot;
  }
}
