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
const commandRecently = require("../Economy/work.js");
const usedCommandRecently = commandRecently.commandrecent.usedCommandRecently;

module.exports.run = async (bot, message, args) => {
    try {
        if (usedCommandRecently.has(message.author.id)) {
            const lol = new MessageEmbed()
                .setTitle("**Error**")
                .setDescription("❌that command is on cooldown. You cannot use that command for some time❌")
                .setColor(0xFF0000)
                .setFooter("Made by HyenaLtd#0001")
            return message.channel.sendEmbed(lol);
        } else {
            console.log("vote command is not on cooldown this was just to notify you");
            usedCommandRecently.add(message.author.id);
            setTimeout(() => {
                usedCommandRecently.delete(message.author.id)
            }, 5000);
        }

        const OMG = new MessageEmbed()
            .setColor(0x00008B)
            .setTitle("❌****Error****❌")
            .setDescription("🔗**you must provide something for vote**🔗")
            .setFooter(`Made by HyenaLtd#0001, asked by ${message.author.username}`)

        if (!args[0]) {
            return message.channel.send(OMG);
        }

        let msgArgs = args.slice(0).join(" ");

        message.channel.send("Yes or no? " + "**" + msgArgs + "**").then(messageReaction => {
            messageReaction.react("👍");
            messageReaction.react("👎");
            message.delete(3000).catch(console.log("Error at message delete statement at vote command"))
        });
    } catch (error) {
        console.log("Error at vote command")
    }
}

module.exports.help = {
    name: "vote",
    description: "Make a vote.",
    usage: "vote <question>",
    type: "Utility"
}