import Discord from 'discord.js';

type Callback = () => any;
type Event = keyof Discord.ClientEvents;

/**
 * The main bot builder.
 */
export class DiscordBotBuilder {
  private prefix = '!';

  private events: Map<Event, Callback> = new Map();

  /**
   * Sets the bot's command prefix
   * (the default one is `!`).
   */
  cmdPrefix(prefix: string): DiscordBotBuilder {
    this.prefix = prefix;

    return this;
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
