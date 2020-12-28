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

const superagent = require('superagent');
const {MessageEmbed} = require('discord.js');
const lang = require("../../lang.json");

module.exports.run = async (bot, message, args) => {
    if (message.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
            .query({
                type: 'pussy'
            })
            .end((err, response) => {
                const pussyembed = new MessageEmbed()
                    .setColor(0x00008b)
                    .setTitle("Click here to get image")
                    .setImage(response.body.message)
                    .setFooter(`Bot by Ca$ey#0001 • Requested by ${message.member.user.username}`, bot.user.avatarURL)
                    .setTimestamp();
                pussyembed.url = pussyembed.image.url
                message.channel.send(pussyembed)
            });
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
    name: "pussy",
    description: "18+ Command.",
    usage: "pussy",
    type: "Utility"
}