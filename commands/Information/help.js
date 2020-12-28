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
    
    if (!args[0]) {
        const helptest = new MessageEmbed()
            .setTitle(`Commands`)
            .addField("`nsfw`", "nsfw commands")
            .addField("`mod`", "mod commands")
            .addField("`fun`", "fun commands")
            .addField("`music`", "play commands")
            .addField("`economy`", "economy commands")
            .addField("`botowner`", "bot owner commands")
            .setFooter("Say .help and the category.", message.author.avatarURL)
        message.channel.send(helptest)
    }
    if (args[0] == "nsfw") {
        const richnewembed = new MessageEmbed()
            .setColor("0x00008B")
            .setTitle("This is not an NSFW channel.")
            .addField("Please use the .setnsfw command in order to set a channel as NSFW", "Error NON-NSFW-50157")
            .addField("If you believe this is in error, let us know.", `Please join our support server ${lang["en_US"].support_server}`)
        if (!message.channel.nsfw) return message.channel.send(richnewembed)
        const nsfwembed = new MessageEmbed()
            .setTitle("NSFW Command")
            .addField("emojis", "emoji nsfw")
            .addField("yaoi", "gay")
            .addField("hentai", "straight")
            .addField("ass", "Send ass image.")
            .addField("pussy", "Send pussy image.")
            .addField("holo", "Send holo image.")
            .addField("lewd", "Send lewd image.")
            .addField("phgif", "Send porn gif.")
            .addField("4k", "Send 4k porn image.")
            .addField("anal", "Send anal image.")
            .setTimestamp()
            .setFooter("NSFW Commands", message.author.avatarURL);
        message.channel.send(nsfwembed)
    }
    if (args[0] == "mod") {
        const modhalp = new MessageEmbed()
            .setTitle("Mod Command")
            .addField("clear", "clears a quantity of messages")
            .addField("kick", "kicked someone")
            .addField("ban", "bans someone")
            .addField("cooldown", "cooldown")
            .addField("invite", "invite link")
            .addField("vote", "create poll")
            .addField("server", "get server info")
            .addField("setnsfw", "sets a channel as NSFW")
            .setTimestamp()
            .setFooter("Mod Commands", message.author.avatarURL)
        message.channel.send(modhalp)
    }
    if (args[0] == "fun") {
        const alo = new MessageEmbed()
            .setTitle("Fun Command")
            .addField("dice", "rolls the dice")
            .addField("8ball", "8BALL, similar to dice")
            .addField("ping", "pings")
            .addField("kill", "kill a user")
            .setTimestamp()
            .setFooter("Fun Commands", message.author.avatarURL)
        message.channel.send(alo)
    }
    if (args[0] == "music") {
        const playcmod = new MessageEmbed()
            .setTitle("Play Command")
            .addField("play", "plays a song")
            .addField("skip", "skips to another song on-queue")
            .addField("stop", "stop song")
            .addField("volume", "volume")
            .addField("np", "now playing")
            .addField("queue", "queue list")
            .addField("pause", "pauses")
            .addField("resume", "resumes")
            .addField("loop", "loops")
            .setTimestamp()
            .setFooter("Music Commands", message.author.avatarURL)
        message.channel.send(playcmod)
    }
    if (args[0] == "economy") {
        const economycmds = new MessageEmbed()
        .setTitle("Economy Command")
        .addField("bal", "shows balance")
        .addField("work", "work and get money")
        .addField("pay", "pay user")
        .setTimestamp()
        .setFooter("Economy Commands", message.author.avatarURL)
    message.channel.send(economycmds)
    }
    if (args[0] == "botowner") {
        const botownercmds = new MessageEmbed()
        .setTitle("Bot Owner Command")
        .addField("serverlist", "shows servers")
        .addField("reload", "reload bot")
        .addField("eval", "evaluate code")
        .setTimestamp()
        .setFooter("Bot Owner Commands", message.author.avatarURL)
    message.channel.send(botownercmds)
    }
}

module.exports.help = {
    name: "help",
    description: "Get help message.",
    usage: "help",
    type: "Utility"
}