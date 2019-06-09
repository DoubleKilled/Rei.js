const Command = require('../../Types/command.js');

class Done extends Command {
    constructor() {
        super({
            ownerOnly: true,
            args: 2
        });
    }

    async run(bot, msg, args) {
        const channelID = args[0];
        const updateMessage = args[1];

        const myMsg = await msg.channel.fetchMessage(channelID);
        const embed = msg.embeds[0];

        await myMsg.edit(updateMessage, { embed });
        await msg.delete();
    }
}
module.exports = Done;