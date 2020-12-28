//   /$$$$$$                                                /$$      /$$                 /$$ /$$                     /$$           /$$            /$$$$$$    
//  /$$__  $$                                              | $$$    /$$$                | $$|__/                    | $$          | $$           /$$__  $$   
// | $$  \__/  /$$$$$$   /$$$$$$$  /$$$$$$  /$$   /$$      | $$$$  /$$$$  /$$$$$$   /$$$$$$$ /$$  /$$$$$$           | $$          | $$          | $$  \__/   
// | $$       |____  $$ /$$_____/ /$$__  $$| $$  | $$      | $$ $$/$$ $$ /$$__  $$ /$$__  $$| $$ |____  $$          | $$          | $$          | $$         
// | $$        /$$$$$$$|  $$$$$$ | $$$$$$$$| $$  | $$      | $$  $$$| $$| $$$$$$$$| $$  | $$| $$  /$$$$$$$          | $$          | $$          | $$         
// | $$    $$ /$$__  $$ \____  $$| $$_____/| $$  | $$      | $$\  $ | $$| $$_____/| $$  | $$| $$ /$$__  $$          | $$          | $$          | $$    $$   
// |  $$$$$$/|  $$$$$$$ /$$$$$$$/|  $$$$$$$|  $$$$$$$      | $$ \/  | $$|  $$$$$$$|  $$$$$$$| $$|  $$$$$$$ /$$      | $$$$$$$$ /$$| $$$$$$$$ /$$|  $$$$$$//$$
//  \______/  \_______/|_______/  \_______/ \____  $$      |__/     |__/ \_______/ \_______/|__/ \_______/| $/      |________/|__/|________/|__/ \______/|__/
//                                         /$$  | $$                                                     |_/                                                
//                                        |  $$$$$$/                                                                                                        
//                                         \______/       
// © 2019 Casey Media, L.L.C. in partnership with Razor Köpfe GmbH (RazoringMinds GmbH).
// All bot code or snippets is © 2019 Casey Maxwell AG. All Rights Reserved.
// RazoringMinds is created by Casey Maxwell (Ca$ey#0001). View the license!

const {MessageEmbed} = require('discord.js');
const lang = require("../../lang.json");

module.exports.run = async (bot, message, args) => {
    const onlineMembers = message.guild.members.cache.filter(member => member.presence.status === "online"); //only green status
    const dndmembers = message.guild.members.cache.filter(member => member.presence.status === "dnd");
    const idleMembers = message.guild.members.cache.filter(member => member.presence.status === "idle"); //only green status
    const offlineMembers = message.guild.members.cache.filter(member => member.presence.status === "offline");
    const fakeMembers = message.guild.members.cache.filter(member => member.user.bot);
    const realMembers = message.guild.members.cache.filter(member => !member.user.bot);
    const serverembodiac = new MessageEmbed()
        .setTitle("Server Information")
        .setColor(0x00008B)
        .setImage(message.guild.iconURL)
        .addField('Name', `${message.guild.name} (${message.guild.nameAcronym})`, true)
        .addField('Server Owner', message.guild.owner.user.tag, true)
        .addField("Server Create Date", message.guild.createdAt, true)
        .addField(`People that are DND`, `${dndmembers.size}`, true)
        .addField(`People that are idle`, `${idleMembers.size}`, true)
        .addField(`People that are offline`, `${offlineMembers.size}`, true)
        .addField(`People that are online`, `${onlineMembers.size}`, true)
        .addField(`Server ID`, `${message.guild.id.length}`, true)
        .addField(`Real people`, `${realMembers.size}`, true)
        .addField(`Region`, `${message.guild.region.length}`, true)
        .addField(`Fakers (bots)`, `${fakeMembers.size}`, true)
        .addField(`Server Created Date`, `${message.guild.createdAt}`, true)
        .setFooter(`${lang["en_US"].copyright}`, bot.user.avatarURL);
    
    message.channel.send(serverembodiac)
}

module.exports.help = {
    name: "server",
    description: "Get server info.",
    usage: "server",
    type: "Utility"
}