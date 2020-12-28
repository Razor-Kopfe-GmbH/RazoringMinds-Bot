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

const getQueue = require("./play.js");
const queue = getQueue.trackqueue.queue;
const {MessageEmbed} = require('discord.js');
const lang = require("../../lang.json");

module.exports.run = async (bot, message, args, premiumStatus) => {
    // if (premiumStatus === true || message.guild.ownerID === "635483684719558666") {
    
        const serverQueue = queue.get(message.guild.id)

        if (serverQueue) {
            if (serverQueue.loop === false) {
                serverQueue.loop === true
                return message.channel.send('🔂 Loop enabled.')
            } else if (serverQueue.loop === true) {
                serverQueue.loop === false
                return message.channel.send('🔂 Loop disabled.')
            }
        }
        return message.channel.send('There is nothing playing.');

    // } else {
    //     const richnewembed = new MessageEmbed()
    //         .setColor("0x00008B")
    //         .setTitle("Server owner does not have Premium.")
    //         .addField("Please join our support server and purchase Premium.", `${lang["en_US"].support_server}`)
    //         .addField("Error NON-PREMIUM-50757", "If you believe this is in error, let us know. Premium delivery should be instant after being ranked in the support server.")
    //     return message.channel.send(richnewembed);
    // }

}

module.exports.help = {
    name: "loop",
    description: "Loops currently playing song.",
    usage: "loop",
    type: "Utility"
}