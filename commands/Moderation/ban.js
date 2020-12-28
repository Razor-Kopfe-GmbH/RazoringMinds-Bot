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
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You\'re missing Ban Members permission.')
    if (!botUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot is missing permission to ban members.")
    let userII = message.mentions.users.first() || client.users.resolve(argsII[0]);
    let bReason = args.join(" ").slice(26);

        if (userII) {
            if (bReason) {
            message.guild.member(userII).ban({ reason: `${bReason}` }).then(() => {
                message.channel.send(`Banned ${userII.tag} for ${bReason}.`)
            }).catch(err => {
                message.channel.send(`Invalid permissions. Error: ${err}.`)
                console.log(err);
            });
        } else {
            message.guild.member(userII).ban({ reason: `No reason provided.`}).then(() => {
                message.channel.send(`Banned ${userII.tag} for No reason provided.`)
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
    name: "ban",
    description: "Ban a user.",
    usage: "ban <@mention> {reason}",
    type: "Utility"
}