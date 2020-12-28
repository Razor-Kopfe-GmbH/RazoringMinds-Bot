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
const hastebin = require('hastebin.js');
const haste = new hastebin({ /* url: 'hastebin.com */ });
const randomColor = require('randomcolor');
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args, premiumStatus) => {
    const clean = (text) => {
        if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)).replace(botconfig["bot_setup"].token, 'REDACTED!') } else { return text }
      }

    if (message.author.id === "210057481458548738" || message.author.id === "521152093181181953") {
        try {
          const code = args.join(' ')
          let evaled = await eval(code) // eslint-disable-line no-eval
    
          if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled, { depth: 3 }) }

          if (evaled.includes(message.client.token || botconfig["bot_setup"].token)) {
            evaled = evaled.replace(message.client.token, 'REDACTED!')
          }
    
          if (clean(evaled).length > 1800) {
            await haste.post(clean(evaled))
              .then(link => {
                const embed = new Discord.MessageEmbed()
                  .setTitle('Eval output exceeds 2000 characters. View on Hastebin.')
                  .setURL(`${link}`)
                  .setColor(randomColor())
                  .setDescription(`Eval output exceeds 2000 characters. View Hastebin [here](${link}).`)
                  .setFooter('Eval Output')
                  .setTimestamp()
                message.channel.send({ embed }).catch((e) => message.channel.send(e.message))
              })
          } else {
            message.channel.send(clean(evaled), {
              code: 'js'
            })
          }
        } catch (err) {
          console.log(err)
          err = err.toString() // eslint-disable-line no-ex-assign
          if (err.includes(message.client.token || botconfig["bot_setup"].token)) {
            err = err.replace(message.client.token, 'REDACTED!') // eslint-disable-line no-ex-assign
          }
          message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``)
        }
    } else {
        message.channel.send("Command must be submitted by the owner of the bot.")
    }
}

module.exports.help = {
    name: "eval",
    description: "Evaluate code (OWNER ONLY).",
    usage: "eval <code>",
    type: "Moderation"
}