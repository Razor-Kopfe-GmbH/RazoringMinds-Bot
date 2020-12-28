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
const Endb = require('endb');
const endb = new Endb('sqlite://coins.sqlite');
const items = new Endb('sqlite://items.sqlite');

module.exports.run = async (bot, message, args) => {
    endb.get(message.author.id)
    .then(valueI => {
        if (!valueI) {
            endb.set(message.author.id, 0)
            .then().catch(console.error);
            let coinEmbed = new MessageEmbed()
                .setAuthor(`${message.member.user.username}#${message.member.user.discriminator}`, `${message.member.user.displayAvatarURL()}`)
                .setColor("0x00008b")
                .addField("Balance", valueI)
                .addField("Items", "N/A")
            message.channel.send(coinEmbed);
        } else {
            items.get(message.author.id)
            .then(value => {
                if (!value) {
                    let coinEmbed = new MessageEmbed()
                        .setAuthor(`${message.member.user.username}#${message.member.user.discriminator}`, `${message.member.user.displayAvatarURL()}`)
                        .setColor("0x00008b")
                        .addField("Balance", valueI)
                        .addField("Items", "N/A")
                    message.channel.send(coinEmbed);
                } else {
                    let coinEmbed = new MessageEmbed()
                        .setAuthor(`${message.member.user.username}#${message.member.user.discriminator}`, `${message.member.user.displayAvatarURL()}`)
                        .setColor("0x00008b")
                        .addField("Balance", valueI)
                        .addField("Items", value)
                    message.channel.send(coinEmbed);
                }
            }).catch(console.error);
        }
    }).catch(console.error);
}

module.exports.help = {
    name: "bal",
    description: "Get balance.",
    usage: "bal",
    type: "Utility"
}