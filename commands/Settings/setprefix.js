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

const botconfig = require("../../botconfig.json");
const default_prefix = botconfig["bot_setup"].prefix;
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) {
        prefix = default_prefix;
    };

    if (message.member.hasPermission("ADMINISTRATOR") || message.author.id === "210057481458548738" || message.author.id === "521152093181181953") {
        if(!args[0]) {
          return message.channel.send("Please give the prefix that you want to set")
        } 
        
        if(args[1]) {
          return message.channel.send("You can not set prefix a double argument")
        }
        
        if(args[0].length > 10) {
          return message.channel.send("You can not send prefix more than 10 characters")
        }
        
        if(args.join("") === default_prefix) {
          db.delete(`prefix_${message.guild.id}`)
         return await message.channel.send("Reset Prefix ✅")
        }
        
        db.set(`prefix_${message.guild.id}`, args[0])
      await message.channel.send(`Set Bot Prefix to ${args[0]}`)
      }
}

module.exports.help = {
    name: "setprefix",
    description: "Sets server-wide prefix.",
    usage: "setprefix <prefix>",
    type: "Utility"
}