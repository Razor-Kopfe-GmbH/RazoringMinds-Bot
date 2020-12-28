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
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You\'re missing Manage Channels permission.')
    if (!botUser.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Bot is missing permission to set channel as NSFW.")
    if (!args[0]) return message.channel.send("Say .setnsfw on or .setnsfw off")
    if (args[0] === 'on') {
        if (message.channel.nsfw) return message.channel.send("This channel is already set on NSFW.")
        message.channel.setNSFW(true, 'RazoringMinds')
        message.channel.send("Channel set on.")
    }
    if (args[0] === 'off') {
        if (!message.channel.nsfw) return message.channel.send("Channel is not nsfw.")
        message.channel.setNSFW(false, 'RazoringMinds')
        message.channel.send("Channel turned off.")
    }
}

module.exports.help = {
    name: "setnsfw",
    description: "Sets nsfw on or off.",
    usage: "setnsfw <on || off>",
    type: "Utility"
}