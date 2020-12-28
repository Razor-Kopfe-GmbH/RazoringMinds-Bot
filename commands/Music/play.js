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

const { Util, MessageEmbed } = require("discord.js");
const botconfig = require("../../botconfig.json");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(botconfig["bot_setup"].youtube_api);
const queue = new Map();
const lang = require("../../lang.json");

module.exports.run = async (bot, message, args, premiumStatus) => {
    // if (premiumStatus === true || message.guild.ownerID === "635483684719558666") {
        const botUser = message.guild.me;
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        const searchString = args.slice(1).join(" ");
        const voiceChannel = message.member.voice.channel;

        const speakPermsError = new MessageEmbed()
        .setTitle(":x: Permissions Error")
        .addField("RazoringMinds failed to connect to the voice channel.", "Error NO-SPEAK-PERMS-50991")
        .addField("More in-depth error code.", "Bot does not have the SPEAK IN VOICE CHANNEL permission. Please ensure that your server has this enabled for RazoringMinds before proceeding.")
        .addField("If you believe that this is in error, let us know.", `Please join our support server ${lang["en_US"].support_server}`)
        .setFooter(`${lang["en_US"].made_by}`);

        const connectPermsError = new MessageEmbed()
        .setTitle(":x: Permissions Error")
        .addField("RazoringMinds failed to connect to the voice channel.", "Error NO-CONNECT-PERMS-50991")
        .addField("More in-depth error code.", "Bot does not have the CONNECT TO VOICE CHANNEL permission. Please ensure that your server has this enabled for RazoringMinds before proceeding.")
        .addField("If you believe that this is in error, let us know.", `Please join our support server ${lang["en_US"].support_server}`)
        .setFooter(`${lang["en_US"].made_by}`);

        if (!voiceChannel) return message.channel.send("Not in voice channel.");

        if (!botUser.hasPermission("SPEAK")) return message.channel.send(speakPermsError);

        if (!botUser.hasPermission("CONNECT")) return message.channel.send(connectPermsError);

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT')) {
            return message.channel.send(connectPermsError);
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send(speakPermsError);
        }
        
        if (!args[0]) {
            message.channel.send("Invalid search query.")
        }
        if (url.match(/^https?:\/\/(((www|beta)\.)?youtube\.com|youtube\.com)\/playlist(.*)$/)) {
            
            const playlist = await youtube.getPlaylist(url);

            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop

                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `✅  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`
                }
            });
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);

                    let index = 0;

                    let embedPlay = new MessageEmbed()
                        .setColor("BLUE")
                        .setAuthor("Search results", message.author.displayAvatarURL())
                        .setDescription(`${videos.map(video2 => `**\`${++index}\`  |**  ${video2.title}`).join("\n")}`)
                        .setFooter("Please choose one of the following 10 results, this embed will auto-deleted in 15 seconds");
                    // eslint-disable-next-line max-depth

                    message.channel.send(embedPlay).then(m => m.delete({
                        timeout: 15000
                    }))
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            max: 1,
                            time: 15000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send({
                            embed: {
                                color: "RED",
                                description: "The song selection time has expired in 15 seconds, the request has been canceled."
                            }
                        });
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "🆘  **|**  I could not obtain any search results"
                        }
                    });
                }
            }
            // response.delete();
            return handleVideo(video, message, voiceChannel);

            async function handleVideo(video, message, voiceChannel, playlist = false) {
                const serverQueue = queue.get(message.guild.id);
                const song = {
                    id: video.id,
                    title: Util.escapeMarkdown(video.title),
                    url: `https://www.youtube.com/watch?v=${video.id}`
                };
                if (!serverQueue) {
                    const queueConstruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 100,
                        playing: true,
                        loop: false
                    };
                    queue.set(message.guild.id, queueConstruct);
                    queueConstruct.songs.push(song);
            
                    try {
                        var connection = await voiceChannel.join();
                        queueConstruct.connection = connection;
                        play(message.guild, queueConstruct.songs[0]);
                    } catch (error) {
                        console.error(`[ERROR] I could not join the voice channel, because: ${error}`);
                        queue.delete(message.guild.id);
                        return message.channel.send({
                            embed: {
                                color: "RED",
                                description: `I could not join the voice channel, because: **\`${error}\`**`
                            }
                        });
                    }
                } else {
                    serverQueue.songs.push(song);
                    if (playlist) return;
                    else return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `✅  **|**  **\`${song.title}\`** has been added to the queue`
                        }
                    });
                }
                return;
            }
            
            function play(guild, song) {
                const serverQueue = queue.get(guild.id);
            
                if (!song) {
                    serverQueue.voiceChannel.leave();
                    return queue.delete(guild.id);
                }
            
                const dispatcher = serverQueue.connection.play(ytdl(song.url))
                    .on("finish", () => {
                        const shiffed = serverQueue.songs.shift();
                        if (serverQueue.loop === true) {
                            serverQueue.songs.push(shiffed);
                        };
                        play(guild, serverQueue.songs[0]);
                    })
                    .on("error", error => console.error(error));
                dispatcher.setVolume(serverQueue.volume / 100);
            
                serverQueue.textChannel.send({
                    embed: {
                        color: "BLUE",
                        description: `🎶  **|**  Start Playing: **\`${song.title}\`**`
                    }
                });
            }
        }

    // } else {
    //     const richnewembed = new MessageEmbed()
    //         .setColor("0x00008B")
    //         .setTitle("Server owner does not have Premium.")
    //         .addField("Please join our support server and purchase Premium.", `${lang["en_US"].support_server}`)
    //         .addField("Error NON-PREMIUM-50757", "If you believe this is in error, let us know. Premium delivery should be instant after being ranked in the support server.")
    //     return message.channel.send(richnewembed);
    // }
}

module.exports.trackqueue = {
    queue: queue
}

module.exports.help = {
    name: "play",
    description: "Play music.",
    usage: "play <url or search term>",
    type: "Utility"
}