/**
 * A command parser for `DiscordBotBuilder`.
 */
export class CommandParser {
  constructor(private prefix: string) {}

  /**
   * Parses a command string with given prefix to an array of strings.
   */
  parse(str: string): string[] | null {
    if (!str.startsWith(this.prefix)) {
      return null;
    }

    const tokens = str
      .substr(this.prefix.length)  // remove the command prefix
      .split(' ');  // tokenize

    // return null if the string was just a command prefix
    return tokens.length > 0 ? tokens : null;
  }
}
