const db = require('../../../../utils/dbUtil.js');

module.exports = async (msg, args) => {
    //Check all of the flags
    await checkFlags(msg, args);

    //Add that message to the database
    await db.addData('quotes', {
        'guildid': msg.guild.id,
        'name': args[2],
        'channelid': msg.channel.id,
        'messageid': args[1],
        'userid': msg.author.id
    });
}

async function checkFlags(msg, args) {
    if(args.length < 3)
        throw 'Not enough arguments.';

    if(isNaN(args[1]))
        throw args[1] + ' is not a valid message ID.';

    let quoteMsg;
    try {
        quoteMsg = await msg.channel.fetchMessage(args[1]);
    } catch (e) {
        throw 'I couldn\'t find the message that you\'re looking for';
    }

    if(await db.ifRowExists('quotes', { 'guildid': msg.guild.id, 'name': args[2] }))
        throw 'Such quote already exists!';

    //Check if this isn't a alert message (for example 'nrabulinski pinned a message to this channel.')
    if(quoteMsg.type != 'DEFAULT')
        throw 'You can only save users\'s messages';
}