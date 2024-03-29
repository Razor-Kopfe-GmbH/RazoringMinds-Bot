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
// RazoringMinds is created by Casey Maxwell (Radar#0001). View the license!

const botconfig = require("./botconfig.json");
const lang = require("./lang.json");
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const DisTube = require("distube")
const bot = new Discord.Client({ restRequestTimeout: 150000})
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const fs = require('fs');
const { Database } = require("@devsnowflake/quick.db");
const db = require("quick.db");
// const db = new Database("./prefixes.sqlite", { table: "JSON" });
const botlister = new (require('botlister'))({ apiToken: botconfig["bot_setup"].discordbotlist_com, defaultBotId: '' }) // discordbotlist.com
const { Client: RDLClient } = require("rdl.js")
const RDL = new RDLClient();
const default_prefix = botconfig["bot_setup"].prefix;
const blapi = require("blapi");
const apiKeys = {
    "discordextremelist.xyz": botconfig["bot_setup"].discordextremelist_xyz,
    "space-bot-list.xyz": botconfig["bot_setup"].space_bots_list_api,
    "discord.boats": botconfig["bot_setup"].discord_boats,
    "blist.xyz": botconfig["bot_setup"].blist_xyz,
    "voidbots.net": botconfig["bot_setup"].voidbots_net,
    "botsfordiscord.com": botconfig["bot_setup"].botsfordiscord_com
}
const { brotliCompressSync } = require("zlib");
const endb = new Database('./premium.sqlite', { table: "JSON" });
var premiumStatus = null;
bot.distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
bot.emotes = botconfig["emoji"]
// const Dashboard = require("@julianyaman/discord-bot-dashboard");

// botconfig["bot_setup"].
// lang["en_US"].

bot.on("guildCreate", guild => {
    RDL.bot.postServers(bot.guilds.cache.size);
    const newguildchannel = guild.systemChannel
    const guildcreateembed = new MessageEmbed()
        .setTitle("Welcome to RazoringMinds!")
        .setDescription(`This is a multi-purpose bot to help you moderate and enjoy your server. Join the Support Server: ${lang["en_US"].support_server}`)
        .setColor("0x00008B")
        .setTimestamp()
        .setFooter(`${lang["en_US"].copyright}`, bot.user.avatarURL)
        .setImage(bot.user.avatarURL)
        .addField("🤔", "RazoringMinds is specifically designed with usability in mind.", true)
        .addField("😱", `Thanks for ${bot.guilds.cache.size} servers. We are very happy you have chosen to use RazoringMinds!`, true)
        .addField("🗒️", `If the bot is online but will not respond to commands, please join our Support Server: ${lang["en_US"].support_server}`);
    newguildchannel.send(guildcreateembed)
})

console.log('\x1b[35m%s\x1b[0m', "Setting up RazoringMinds. This might take a few seconds!")
fs.readdir("./commands/Music/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Music/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[36m%s\x1b[0m', "- Music Module Loaded!")
});

fs.readdir("./commands/NSFW/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/NSFW/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[33m%s\x1b[0m', "- NSFW Module Loaded!")
});

fs.readdir("./commands/Economy/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Economy/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[32m%s\x1b[0m', "- Economy Module Loaded!")
});

fs.readdir("./commands/Fun/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Fun/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[94m%s\x1b[0m', "- Fun Module Loaded!")
});

fs.readdir("./commands/Information/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Information/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[37m%s\x1b[0m', "- Info Module Loaded!")
});

fs.readdir("./commands/Moderation/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Moderation/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[91m%s\x1b[0m', "- Moderation Module Loaded!")
});

fs.readdir("./commands/Owner/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Owner/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[92m%s\x1b[0m', "- Owner Module Loaded!")
});

fs.readdir("./commands/Settings/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log('\x1b[31m%s\x1b[0m', "Could not find folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/Settings/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
        props.help.aliases.forEach(aliases => bot.aliases.set(aliases, props.help.name));
    });
    console.log('\x1b[36m%s\x1b[0m', "- Settings Module Loaded!")
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) {
        prefix = default_prefix;
    };

    const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
    return message.channel.send(`Hi! <@${message.author.id}>, My prefix is \`${prefix}\``);
 }

    const guild = bot.guilds.cache.get("705177845546352640")
    if(!endb.get(`${message.guild.ownerID}`)) {
        if (!guild.member(message.author.id) || !guild.member(message.author.id).roles.cache.has("706759847164772404") && message.guild.ownerID === message.author.id) {
            endb.set(message.guild.ownerID, false)
            premiumStatus = false
        }
    }
    else if (endb.get(`${message.guild.ownerID}`)) {
        premiumStatus = true
    }
    if (guild.member(message.author.id) && guild.member(message.author.id).roles.cache.has("706759847164772404") && message.guild.ownerID === message.author.id) {
        endb.set(message.guild.ownerID, true)
        premiumStatus = true
    }
    if (message.guild.ownerID === "635483684719558666") {
        endb.set(message.guild.ownerID, true)
        premiumStatus = true
    }

    // endb.find(message.guild.ownerID)
    // .then(valueI => {
    //     const guild = bot.guilds.cache.get("705177845546352640")
    //     if (!valueI) {
    //         if (!guild.member(message.author.id) || !guild.member(message.author.id).roles.cache.has("706759847164772404") && message.guild.ownerID === message.author.id) {
    //             endb.set(message.guild.ownerID, false)
    //             .then().catch(console.error);
    //             premiumStatus = false
    //         }
    //     }
    //     else if (valueI === true) {
    //         premiumStatus = true
    //     }
    //     if (guild.member(message.author.id) && guild.member(message.author.id).roles.cache.has("706759847164772404") && message.guild.ownerID === message.author.id) {
    //         endb.set(message.guild.ownerID, true)
    //         .then().catch(console.error);
    //         premiumStatus = true
    //     }
    //     if (message.guild.ownerID === "635483684719558666") {
    //         endb.set(message.guild.ownerID, true)
    //         .then().catch(console.error);
    //         premiumStatus = true
    //     }
    // }).catch(console.error);

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    
    if (!message.content.startsWith(prefix)) return;
    // bot.aliases.set(props.help.name, props.help.aliases);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    // const command = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) {

        commandfile.run(bot, message, args, premiumStatus);
    }

});

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${bot.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${bot.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${bot.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${bot.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${bot.emotes.error} | Searching canceled`))
    .on("error", (message, err) => message.channel.send(`${bot.emotes.error} | An error encountered: ${err}`))

bot.on("ready", () => {
    console.log('\x1b[32m%s\x1b[0m', `RazoringMinds is online and set up! I'm on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} users.`);

    var Messages = lang["en_US"].Messages
    // var Messages = [
    //     ".help - discord.gg/rYNARzv",
    //     "watching people enter commands",
    //     "Did you know you are more likely to die from being struck by lightning than win the lottery",
    //     "Hyenas are cute",
    //     "The best selling car of all-time is the Toyota Corolla",
    //     "The UK's full name is The United Kingdom of Great Britian and Northern Ireland",
    //     "General Motors was the first car company to install turn signals in their cars",
    //     "The Chrysler Imperial was the first ever car to include power steering",
    //     "The Lincoln Custom was the first ever car to include power windows",
    //     "The first house to be lit by electricity was in Appleton, New Jersey on September 30, 1882",
    //     "The first ever refridgerator was invented by American inventor Jacob Perkins in 1834",
    //     "The first ever television station was called WGY Television and broadcasted from Schenactady, NY",
    //     "The first ever radio broadcast was done by KDKA radio on November 2, 1920."
    // ];

    bot.user.setStatus("dnd");

    botlister.updateBotStatistics({ // discordbotlist.com
        guilds: bot.guilds.cache.size,
        users: bot.users.cache.size,
    }).catch(console.error);

    blapi.manualPost(bot.guilds.cache.size, '', apiKeys);

    setInterval(function() {

        botlister.updateBotStatistics({ // discordbotlist.com
            guilds: bot.guilds.cache.size,
            users: bot.users.cache.size,
        }).catch(console.error);

        blapi.manualPost(bot.guilds.cache.size, '', apiKeys);

    }, 300000);

    setInterval(function() {
        var randomMessage = Messages[Math.floor(Math.random() * Messages.length)];
        bot.user.setActivity(`${bot.guilds.cache.size} servers | ${randomMessage}`, {
            type: "LISTENING"
        });
    }, 45000);

    // Dashboard({
    //     port: botconfig["bot_setup"].dbd_port, 
    //     clientSecret: botconfig["bot_setup"].dbd_client_secret, 
    //     clientID: botconfig["bot_setup"].dbd_client_id,
    //     callbackURL: botconfig["bot_setup"].dbd_redirect_uri
    // });

    // dashboard.run(bot, {
    //     port: botconfig["bot_setup"].dbd_port, 
    //     clientSecret: botconfig["bot_setup"].dbd_client_secret, 
    //     redirectURI: botconfig["bot_setup"].dbd_redirect_uri
    //   });
});

// Event emitted after login is successful.
RDL.once("ready", () => {
    // Bot data will be available from RDL.bot
    console.log(`RDL Logged in as ${RDL.bot.tag}`);
})

// Example - webhook server using express
let express = require("express");
let app = express();
app.use("/api", RDL.webhooks());

bot.login(botconfig["bot_setup"].token);
RDL.login(botconfig["bot_setup"].discord_rovelstars_com)
    .catch(e => console.error("Error Occurred! " + e));
