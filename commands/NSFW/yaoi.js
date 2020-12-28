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
const tnai = require('tnai');

module.exports.run = async (bot, message, args) => {
    if (message.channel.nsfw === true) {
        const cli = new tnai();
        const yaoiimg = await cli.hentai.yaoi();
        const embodpa = new MessageEmbed()
            .setColor(0x00008B)
            .setTitle("Click here to get image")
            .setURL(yaoiimg)
            .setImage(yaoiimg)
            .setTimestamp()
            .setFooter(`Bot by Ca$ey#0001 • Requested by ${message.member.user.username}`, bot.user.avatarURL);
        message.channel.send(embodpa)  
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
    name: "yaoi",
    description: "18+ Command.",
    usage: "yaoi",
    type: "Utility"
}