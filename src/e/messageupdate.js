const { MessageEmbed } = require("discord.js-selfbot-v13");

module.exports = {
    name: 'messageUpdate',
    once: false, // this is just here if you prefer a ready event file rather than built in ig
    async execute(oldMessage, newMessage, logweb, errorwebhook) {
        try {
            if (!oldMessage || !newMessage || !newMessage.author) return; // ensuring objects exist
            if (oldMessage.guild.id !== "serverid") return; // customiseable server id (so it only works for that server, remove if not needed.)
            if (newMessage.author.bot) return; // no bot message logging
            if (oldMessage.content === newMessage.content && oldMessage.attachments.size === newMessage.attachments.size) return; // checking they arent the same

            const oc = oldMessage.content || (oldMessage.attachments.first() ? oldMessage.attachments.first().url : "*why you break, dm me this?*");
            const nc = newMessage.content || (newMessage.attachments.first() ? newMessage.attachments.first().url : "*why you break, dm me this?*");

            const em = new MessageEmbed()
                .setAuthor({ name: newMessage.member?.nickname || newMessage.author.username, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) }) .setDescription(`<@${newMessage.author.id}> **edited a message in #${newMessage.channel?.name || "unknown channel?"}**`) .addFields( { name: "Before:", value: oc, inline: false }, { name: "After:", value: nc, inline: false } ) .setTimestamp() .setColor(0x337fd5) .setFooter({ text: `ID: ${oldMessage.author?.id || "Unknown"}` }); // unknown to prevent errors
            logweb.send({ embeds: [em] });
        } catch (error) { console.error('error messageUpdate event:', error); errorwebhook.send({ content: `error \n${error.message}` }); }
    },};
