require('dotenv').config();
const { Client, WebhookClient,  } = require('discord.js-selfbot-v13'); const fs = require('fs'); const path = require('path');

const client = new Client({ ws: {properties: { $browser: "Discord Client"}},}); // spoofs platform
const errorwebhook = new WebhookClient({ url: process.env.errorw}); // for errors
const logweb = new WebhookClient({ url: process.env.logweb}); // actual webhook for logging changes, and whatnot
const et = path.join(__dirname, 'e');
const ef = fs.readdirSync(et).filter(f => f.endsWith('.js'))

process.on('unhandledRejection', error => { console.error('error', error); errorwebhook.send({ content: `error \n${error.message}`})}); //error 

client.on('ready',  () => { console.log(`logged in as ${client.user.globalName} ✅`)}) 

for (const f of ef) { const e = require(path.join(et, f)); if (e.once) { client.once(e.name, (...args) => e.execute(...args, logweb)); } else {client.on(e.name, (...args) => e.execute(...args, logweb));}};
client.login(`${process.env.token}`, console.log(`🕕 logging on`)).catch(error => {console.error('Error', error.message)});