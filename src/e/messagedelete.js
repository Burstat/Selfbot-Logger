const { MessageEmbed } = require("discord.js-selfbot-v13");

module.exports = {
    name: 'messageDelete',
    once: false, // this is just here if you prefer a ready event file rather than built in ig
    async execute(message, logweb, errorwebhook) {
        try {
            if (!message || !message.author) return; // ensuring objects exist
            if (message.guild.id !== "") return; // customiseable server id (so it only works for that server, remove if not needed.)
            if (message.author.bot) return; // no bot origin message logging
            const dc = message.content || (message.attachments.first() ? message.attachments.first().url : "*why you break, dm me this?*");

            const em = new MessageEmbed()
            .setAuthor({ name: message.member?.nickname || message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setDescription(`**Message sent by <@${message.author.id}> deleted in #${message.channel?.name || "unknown channel?"}**\n${dc}`).setTimestamp() .setColor(0xd53333) .setFooter({ text: `ID: ${message.author?.id || "Unknown"}` }); // unknown to prevent errors
            logweb.send({ embeds: [em] });
        } catch (error) {
            console.error('error messageDelete event:', error); errorwebhook.send({ content: `error \n${error.message}` });}
    },};
