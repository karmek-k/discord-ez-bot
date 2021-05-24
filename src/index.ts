import Discord from 'discord.js';

/**
 * The main bot builder.
 */
export class DiscordBotBuilder {
  private prefix = '!';

  /**
   * Sets the bot's command prefix
   * (default is `!`).
   */
  public setPrefix(prefix: string): DiscordBotBuilder {
    this.prefix = prefix;

    return this;
  }

  /**
   * Builds a Discord.js's `Discord.Client` instance
   * from given properties.
   */
  public build(): Discord.Client {
    const bot = new Discord.Client();
    
    return bot;
  }
}
