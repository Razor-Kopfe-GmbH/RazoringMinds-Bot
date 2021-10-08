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
const Endb = require('endb');
const endb = new Endb('sqlite://coins.sqlite');

module.exports.run = async (bot, message, args) => {
    endb.get(message.author.id)
    .then(value => {
        if (!value) {
            endb.set(message.author.id, 0)
            .then().catch(console.error);
        } else {
            let shopEmbed = new MessageEmbed()
                .setColor("0x00008b")
                .setTitle(`**RazorCoins Shop**`)
                .addField("VHS", `RM$25 💸`)
                .addField("Camcorder", `RM$300 💸`)
                .addField("Television", `RM$500 💸`)
                .addField("Vacuum", `RM$750 💸`)
                .addField("Mustang", `RM$1750 💸`)
                .addField("Ferrari", `RM$7500 💸`)
                .addField("Lamborghini", `RM$17500 💸`)
                .addField("Mansion", `RM$35000 💸`)
                .setDescription(`You have **RM$${value}**\nYou can buy items with \`buy <item>\` e.g. buy Camcorder`)
            message.channel.send(shopEmbed)
        }
    }).catch(console.error);
}

module.exports.help = {
    name: "shop",
    aliases: [],
    description: "View buyable products.",
    usage: "shop",
    type: "Utility"
}
