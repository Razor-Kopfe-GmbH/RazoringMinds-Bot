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
const items = new Endb('sqlite://items.sqlite');

module.exports.run = async (bot, message, args) => {
    endb.get(message.author.id)
    .then(value => {
        if (!value) {
            endb.set(message.author.id, 0)
            .then().catch(console.error);
        } else {
            const item = args
            if (item[0] == "vhs" && value >= 25) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `vhs_1`)
                        .then().catch(console.error);
                    } else {
                        var vhsValue = value.replace('vhs_', '');
                        items.set(message.author.id, `vhs_${parseInt(vhsValue)+parseInt(1)}`)
                        .then().catch(console.error);
                        // items.delete(message.author.id)
                        // .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 25)
                .then().catch(console.error);
                message.channel.send('Purchased VHS Player for RM$25');
            } else if (item[0] == "camcorder" && value >= 300) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `camcorder_1`)
                        .then().catch(console.error);
                    } else {
                        var camcorderValue = value.replace('camcorder_', '');
                        items.set(message.author.id, `camcorder_${parseInt(camcorderValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 300)
                .then().catch(console.error); 
                message.channel.send('Purchased Camcorder for RM$300');
            } else if (item[0] == "television" && value >= 500) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `television_1`)
                        .then().catch(console.error);
                    } else {
                        var televisionValue = value.replace('television_', '');
                        items.set(message.author.id, `television_${parseInt(televisionValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 500)
                .then().catch(console.error); 
                message.channel.send('Purchase Television for RM$500');
            } else if (item[0] == "vacuum" && value >= 750) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `vacuum_1`)
                        .then().catch(console.error);
                    } else {
                        var vacuumValue = value.replace('vacuum_', '');
                        items.set(message.author.id, `vacuum_${parseInt(vacuumValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 750)
                .then().catch(console.error); 
                message.channel.send('Purchased Vacuum Cleaner for RM$750');
            } else if (item[0] == "mustang" && value >= 1750) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `mustang_1`)
                        .then().catch(console.error);
                    } else {
                        var mustangValue = value.replace('mustang_', '');
                        items.set(message.author.id, `mustang_${parseInt(mustangValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 1750)
                .then().catch(console.error); 
                message.channel.send('Purchased Ford Mustang for RM$1750');
            } else if (item[0] == "ferrari" && value >= 7500) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `ferrari_1`)
                        .then().catch(console.error);
                    } else {
                        var ferrariValue = value.replace('ferrari_', '');
                        items.set(message.author.id, `ferrari_${parseInt(ferrariValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 7500)
                .then().catch(console.error); 
                message.channel.send('Purchased Ferrari Testarossa for RM$7500');
            } else if (item[0] == "lamborghini" && value >= 17500) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `lamborghini_1`)
                        .then().catch(console.error);
                    } else {
                        var lamborghiniValue = value.replace('lamborghini_', '');
                        items.set(message.author.id, `lamborghini_${parseInt(lamborghiniValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 17500)
                .then().catch(console.error); 
                message.channel.send('Purchased Lamborghini Countach for RM$17500');
            } else if (item[0] == "mansion" && value >= 35000) {
                items.get(message.author.id)
                .then(value => {
                    if (!value) {
                        items.set(message.author.id, `mansion_1`)
                        .then().catch(console.error);
                    } else {
                        var mansionValue = value.replace('mansion_', '');
                        items.set(message.author.id, `mansion_${parseInt(mansionValue)+parseInt(1)}`)
                        .then().catch(console.error);
                    }
                }).catch(console.error);
                endb.set(message.author.id, value - 35000)
                .then().catch(console.error); 
                message.channel.send('Purchased Mansion for RM$35000');
            }
        }
    }).catch(console.error);
}

module.exports.help = {
    name: "buy",
    aliases: [],
    description: "Buy products.",
    usage: "buy <item>",
    type: "Utility"
}
