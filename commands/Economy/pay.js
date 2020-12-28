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

module.exports.run = async (bot, message, args) => {

    let pUser = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    if(pUser.user.bot) {
        let payBotEmbed = new MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot pay bot')
            .setDescription(`Second argument must not a bot`)
        return message.channel.send(payBotEmbed);
    }

    if(pUser.id === message.author.id) {
        let payYourselfEmbed = new MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot pay yourself')
            .setDescription(`Second argument must not be yourself`)
        return message.channel.send(payYourselfEmbed);
      }

    if (args[0] <= 0) {
        let negativeInfinityEmbed = new MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot use number from the first argument.')
            .setDescription(`First argument must not be negative.`)
        return message.channel.send(negativeInfinityEmbed);
    }

    if(args[0] == ""||args[0]==undefined){
        let missingAmountEmbed = new MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot get the amount from the first argument')
            .setDescription(`First argument must be included`)
        return message.channel.send(missingAmountEmbed);
    }

    if(Math.floor(args[0]) != args[0]){
        let notNumberEmbed = new MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Not a number')
            .setDescription(`"${args[0]}" is not a number or is a decimal`)
        return message.channel.send(notNumberEmbed);
    }

    if(args[1] == ""||args[1]==undefined){
        let noUserEmbed = new MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Cannot get the user mention from the second argument')
            .setDescription(`Second argument must be included`)
        return message.channel.send(noUserEmbed);
    }

    endb.get(pUser.id)
    .then(value => {
        if (!value) {
            endb.set(pUser.id, 0)
            .then().catch(console.error);
        }
    }).catch(console.error)

    endb.get(pUser.id)
    .then(value => {
        if(args[0]>value) {
            let notEnoughMoneyEmbed = new MessageEmbed()
                .setTitle('Not enough money!')
                .setColor('#FF2D40')
                .addField('Cannot fullfil your request :cry:', `You don't have enough money to give! ${args[0]} > ${value}`)
            return message.channel.send(notEnoughMoneyEmbed);
        }
    }).catch(console.error)

    endb.get(message.author.id)
    .then(valueII => {
        if(valueII > args[0]) {
            endb.get(message.author.id)
            .then(value => {
                endb.set(message.author.id, value - parseInt(args[0]))
                .then().catch(console.error);
            })
        
            endb.get(pUser.id)
            .then(value => {
                endb.set(pUser.id, value + parseInt(args[0]))
                .then().catch(console.error);
            }).catch(console.error)
            
            message.channel.send(`${message.author.username} has given ${pUser} ${args[0]} RazorBucks!`)
        }
    })
}

module.exports.help = {
    name: "pay",
    description: "Pay a user.",
    usage: "pay <amount> <@mention>",
    type: "Utility"
}