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
const usedCommandRecently = new Set();
const lang = require("../../lang.json");
const workquotes = lang["en_US"].workquotes

module.exports.run = async (bot, message, args) => {
    try {
        if (usedCommandRecently.has(message.author.id)) {
            message.channel.send("You cannot work for a day!");
        } else {

            endb.get(message.author.id)
            .then(value => {
                if (!value) {
                    endb.set(message.author.id, 0)
                    .then().catch(console.error);
                }
            }).catch(console.error)

            var r = Math.floor(Math.random() * 100) + 1;
            const randomwork = workquotes[Math.floor(Math.random() * workquotes.length)]
            const workembed = new MessageEmbed()
                .setTitle("Job Working")
                .setColor("0x00008b")
                .addField(randomwork, `You earned $${r}!`)
            message.channel.send(workembed)
            
            endb.get(message.author.id)
            .then(value => {
                endb.set(message.author.id, value + r)
                .then().catch(console.error);
            }).catch(console.error)

            usedCommandRecently.add(message.author.id);
            setTimeout(() => {
                usedCommandRecently.delete(message.author.id)
            }, 8.64e+7);
            
        }
    } catch (error) {
        console.log(error)
        console.log("Error at cooldown command")
    }
}

module.exports.commandrecent = {
    usedCommandRecently: usedCommandRecently
}

module.exports.help = {
    name: "work",
    description: "Work for money.",
    usage: "work",
    type: "Utility"
}