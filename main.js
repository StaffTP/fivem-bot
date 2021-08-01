const Tristan = require('discord.js');
const client = new Tristan.Client();
const fs = require('fs');
const cfg = require('./config.json');
const prefix = (cfg.bot_info.prefix);
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi(cfg.fivem_server_info.server_ip + ':' + cfg.fivem_server_info.server_port);

client.commands = new Tristan.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on('ready', () => {
    client.user.setActivity(cfg.bot_info.status);
    console.log('Bot Started');
});

client.on('message', message => {
    if(message.member != null && message.member.hasPermission('KICK_MEMBERS'));
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'serverinfo'){

        client.commands.get('serverinfo').execute(message, args, Tristan, fivem, server);
    }
});


client.login(cfg.bot_info.token);