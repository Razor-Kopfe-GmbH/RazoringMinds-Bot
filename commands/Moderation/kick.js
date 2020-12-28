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

module.exports.run = async (bot, message, args) => {
    const botUser = message.guild.members.cache.get(bot.user.id);
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You\'re missing Kick Members permission.')
    if (!botUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Bot is missing permission to kick members.")
    let user = message.mentions.users.first() || client.users.resolve(args[0]);
    let kReason = args.join(" ").slice(22);

        if (user) {
            if (kReason) {
            message.guild.member(user).kick(kReason).then(() => {
                message.channel.send(`Kicked ${user.tag} for ${kReason}.`)
            }).catch(err => {
                message.channel.send(`Invalid permissions. Error: ${err}.`)
                console.log(err);
            });
        } else {
            message.guild.member(user).kick("No reason provided.").then(() => {
                message.channel.send(`Kicked ${user.tag} for No reason provided.`)
            }).catch(err => {
                message.channel.send(`Invalid permissions. Error: ${err}.`)
                console.log(err);
            });
        }
        } else {
            message.reply(`User isn't in server.`);
        }
}

module.exports.help = {
    name: "kick",
    description: "Kick a user.",
    usage: "kick <@mention> {reason}",
    type: "Utility"
}