const { MessageEmbed } = require("discord.js-selfbot-v13");

module.exports = {
    name: 'messageUpdate',
    once: false, // this is just here if you prefer a ready event file rather than built in ig
    async execute(oldMessage, newMessage, logweb, errorwebhook) {
        try {
            if (!oldMessage || !newMessage || !newMessage.author) return; // ensuring objects exist
            if (newMessage.author.bot) return; // no bot message logging
            if (oldMessage.content === newMessage.content) return; // checking they arent the same

            const em = new MessageEmbed()
                .setAuthor({ name: newMessage.member?.nickname || newMessage.author.username, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) }) .setDescription(`<@${newMessage.author.id}> **edited a message in #${newMessage.channel?.name || "Unknown Channel"}**` ) .addFields( { name: "Before:", value: oldMessage.content || "*Possibly an image*", inline: false }, { name: "After:", value: newMessage.content || "*Possibly an image*", inline: false } ) .setTimestamp() .setColor(0x337fd5) .setFooter({ text: `ID: ${oldMessage.author?.id || "Unknown"}` }); // unknown to prevent errors
            logweb.send({ embeds: [em] });
        } catch (error) { console.error('error messageUpdate event:', error); errorwebhook.send({ content: `error \n${error.message}`})}
    }, };
