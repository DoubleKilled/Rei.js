const ReactionCommand = require("../../Types/reactioncommand");

const stares = [
  "https://i.imgur.com/6r9SmUG.gif",
  "https://i.imgur.com/OH19C2Z.gif",
  "https://i.imgur.com/Y7h4ydz.gif",
  "https://i.imgur.com/ISx4BbT.gif",
  "https://i.imgur.com/7TKsVSA.gif",
  "https://i.imgur.com/BV6yX7y.gif",
  "https://i.imgur.com/KA2TQFE.gif",
];

class Stare extends ReactionCommand {
  constructor() {
    super(stares);
  }

  async run(bot, msg, args) {
    await super.sendReaction(msg, "👀 **%target%**", args);
  }
}
module.exports = {
  command: Stare,
  help: {
    summary: "Stare...",
    args: [
      {
        name: "user",
        summary: "Discord user that the stare is directed to.",
        required: false,
      },
    ],
  },
};
