const { MessageEmbed, Message } = require("discord.js")


module.exports = {
    name: 'serverinfo',
    description: 'show some information about your fivem server',
    async execute(message, args, Tristan, fivem, server) {
        
        if(args[0] == null){
            const helpEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('FiveM Server Information Help')
            .setDescription('Please use one of the following commands below:')
            .addFields(
                { name: '**-serverinfo** `<type>`', value: 'Types: Status, PlayerList, PlayersOnline, ServerVersion, Slots, Language, Tags'}
            )
            message.channel.send(helpEmbed)
        } else {

        if(args[0] === 'status'){
            const status = server.getServerStatus()
            if(status === 'online'){
                return ':white_check_mark:';
            }
            if(status === 'offline'){
                return ':x:';
            }
            const statusEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Server Status' + status)
            .setDescription('The server is Online with ' + server.getPlayersOnline + ' players.')
            message.channel.send(statusEmbed)
        } else {
            if(args[0] === 'playerlist'){
                server.getPlayers().then((data) => {
                    let result  = [];
                    let index = 1;
                    for (let player of data) {
                      result.push(`${index++}. ${player.name}(#${player.id}), `);
                    }
                    const playersOnline = server.getPlayersOnline()
                    const embed = new Tristan.MessageEmbed()
                      .setColor("BLUE")
                      .setTitle(`Online Players (${data.length}/${playersOnline})`)
                      .setDescription(result.length > 0 ? result : 'No Players Online!')
                      .setTimestamp();
                    message.channel.send(embed);
                  }).catch((err) => {
                    const embed = new Tristan.MessageEmbed()
                    .setColor("RED")
                    .setAuthor("Cannot fetch players (Server is Offline)")
                    .setTimestamp();
                  message.channel.send(embed);
                  });
            } else {
                if(args[0] === 'playersonline'){
                    const playersOnline = server.getPlayersOnline()

                    const playersonlineEmbed = new MessageEmbed()
                    .setTitle(`Online Players (${data.length}/${playersOnline})`)
                    message.channel.send(playersonlineEmbed)
                } else {
                    if(args[0] === 'serverversion'){
                        const sv = server.getServerVersion
                        const serververEmbed = new MessageEmbed()
                        .setTitle('Server Version')
                        .setColor('BLUE')
                        .setDescription(`The server version for this server is: ${sv}`)
                        message.channel.send(serververEmbed)
                    } else {
                        if(args[0] === 'slots'){
                            const serverslots = server.getMaxPlayers()

                            const slotsEmbed = new MessageEmbed()
                            .setTitle('The max slots for this server is:' + serverslots)
                            .setColor('BLUE')
                            message.channel.send(slotsEmbed)
                        } else {
                            if(args[0] === 'language'){
                                const serverlang = server.getServerLocale()
                                const serverlangEmbed = new MessageEmbed()
                                .setTitle('The server language for this server is:' + serverlang)
                                .setColor('BLUE')
                                message.channel.send(serverlangEmbed)
                            } else {
                                if(args[0] === 'tags'){
                                    const servertags = server.getServerTags()
                                    const servertagsEmbed = new MessageEmbed()
                                    .setTitle('Server Tags')
                                    .setColor('BLUE')
                                    .setDescription(servertags)
                                    message.channel.send(servertagsEmbed)
                                }
                            }
                        }
                    }
                }
            }
        }

    }
}
}