const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();

const Builder = require('_initBuilder.js');
const cmdHandler = new Builder.cmdHandler(client);

/*
    Config loading
*/
let config = { };
try {
    config = require('./data/config.json');
} catch (err) {
    config = { token: "", ownerid: "" }

    // Create files
    fs.mkdirSync('./data/');
    fs.writeFileSync('./data/config.json', JSON.stringify(config));

    console.log("I noticed that you don't have an existing config file. I've created it at /data/config.json!");
    return 0;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.name} [${client.user.id}]`)
});

client.on('message', async message => {
    if (message.content.startsWith()) {
        const cmdData = message.content.split(' ', 2);
        const cmd = cmdData[0].substring("$".length, cmdData[0].length);

        try {
            await cmdHandler.run(message, cmd, cmdData[1]);
        } catch(err) {
            message.channel.send(new Discord.RichEmbed()
            .setTitle('Woops!')
            .setDescription(err)
            .setFooter("You shouldn't be seeing this!"))
        }
    }
});

if (token != null)
    client.login(config.token);