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

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.id === "210057481458548738" || message.author.id === "521152093181181953") {
    await message.delete();

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description = 
    `Servers: ${bot.guilds.cache.size}\n\n`+
    bot.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.id} | ${r.memberCount} members`)
        .slice(0, 10)
        .join("\n");

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setFooter(bot.user.username)
        .setTitle(`Page: ${page}/${Math.ceil(bot.guilds.cache.size/10)}`)
        .setDescription(description);

    const msg = await message.channel.send(embed);
    
    await msg.react("⬅");
    await msg.react("➡");
    await msg.react("❌");

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async(reaction) => {

        if(reaction._emoji.name === "⬅") {

            // Updates variables
            i0 = i0-10;
            i1 = i1-10;
            page = page-1;
            
            // if there is no guild to display, delete the message
            if(i0 < 0){
                return msg.delete();
            }
            if(!i0 || !i1){
                return msg.delete();
            }
            
            description = `Servers: ${bot.guilds.cache.size}\n\n`+
            bot.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.id} | ${r.memberCount} Members`)
                .slice(i0, i1)
                .join("\n");

            // Update the embed with new informations
            embed.setTitle(`Page: ${page}/${Math.round(bot.guilds.cache.size/10)}`)
                .setDescription(description);
        
            // Edit the message 
            msg.edit(embed);
        
        }

        if(reaction._emoji.name === "➡"){

            // Updates variables
            i0 = i0+10;
            i1 = i1+10;
            page = page+1;

            // if there is no guild to display, delete the message
            if(i1 > bot.guilds.cache.size + 10){
                return msg.delete();
            }
            if(!i0 || !i1){
                return msg.delete();
            }

            description = `Servers: ${bot.guilds.cache.size}\n\n`+
            bot.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.id} | ${r.memberCount} members`)
                .slice(i0, i1)
                .join("\n");

            // Update the embed with new informations
            embed.setTitle(`Page: ${page}/${Math.round(bot.guilds.cache.size/10)}`)
                .setDescription(description);
        
            // Edit the message 
            msg.edit(embed);

        }

        if(reaction._emoji.name === "❌"){
            return msg.delete(); 
        }

        // Remove the reaction when the user react to the message
        await reaction.users.remove(message.author.id);

    });  
}
else {
    message.channel.send("Invalid permission to run serverlist command.")
} 
}

module.exports.help = {
    name: "serverlist",
    description: "Lists servers.",
    usage: "serverlist",
    type: "Utility"
}