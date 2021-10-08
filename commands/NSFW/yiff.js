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

const {MessageEmbed} = require('discord.js');
const lang = require("../../lang.json");
const redditimage = require('reddit.images');
const subredditCategory = [
    "yiff"
]

module.exports.run = async (bot, message, args) => {
    if (message.channel.nsfw === true) {
        let subreddit = subredditCategory[Math.floor(Math.random() * subredditCategory.length)];
        try {
            await redditimage.fetch({
                type: "custom",
                total: 1,
                subreddit: [subreddit],
            }).then((result) => {
                    const embodpa = new MessageEmbed()
                    .setColor(0x00008B)
                    .setTitle(`${result[0].title}`)
                    .setURL(`${result[0].postLink}`)
                    .setImage(`${result[0].image}`)
                    .setTimestamp()
                    .setFooter(`Bot by Radar#0001 • Upvotes: ${result[0].upvotes} Downvotes: ${result[0].downvotes}`, bot.user.avatarURL);
                message.channel.send(embodpa)  
            });
        } catch(err) {
                const richnewembedI = new MessageEmbed()
                .setColor("0x00008B")
                .setTitle("Unknown unexplained error.")
                .addField(`Error: ${err}`, "Error UNKNOWN-ERR-50147")
                .addField("If you believe this is in error, let us know.", `Please join our support server ${lang["en_US"].support_server}`)
            message.channel.send(richnewembedI)
          }

    } else {
            const richnewembed = new MessageEmbed()
                .setColor("0x00008B")
                .setTitle("This is not an NSFW channel.")
                .addField("Please use the .setnsfw command in order to set a channel as NSFW", "Error NON-NSFW-50157")
                .addField("If you believe this is in error, let us know.", `Please join our support server ${lang["en_US"].support_server}`)
            message.channel.send(richnewembed)
          }
}

module.exports.help = {
    name: "yiff",
    aliases: [],
    description: "18+ Command.",
    usage: "yiff",
    type: "Utility"
}
