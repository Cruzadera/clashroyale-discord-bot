// const fs = require('fs');
// const path = require('path');
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('config');
const { request } = require('undici');
const { generateTableCup } = require('./generateTable');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.AutoModerationExecution] });

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

client.once(Events.ClientReady, () => {
    console.log('Ready!');
});

client.on(Events.MessageCreate, async interaction => {
    const commandName = interaction.content;

    if (commandName === 'cat') {
        const catResult = await request('https://aws.random.cat/meow');
        const { file } = await catResult.body.json();
        interaction.reply({ files: [{ attachment: file, name: 'cat.png' }] });
    } else if (commandName === 'clash') {
        const result = await generateTableCup();
        const embed = {
            color: 0x0099ff,
            title: result.name,
            fields: result.membersList,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Torneo finalizado' + result.endedTime.toString(),
            },
        };
        interaction.reply({ embeds: [embed] });
    }
});
// Log in to Discord with your client's token
const token = config.get('BOT_TOKEN');
client.login(token);