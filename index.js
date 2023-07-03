const { Client, IntentsBitField, ActivityType } = require('discord.js');

require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (client) => {
    console.log('Bot prendido');
    client.user.setActivity({
        name: 'Checking Status',
        type: ActivityType.Playing,
    });
});

let lastTimeStatus = false;

const pingToSwiss = (url, interval) => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    fetch(url)
        .then((resp) => {
            console.log(resp.status);
            if (resp.status === 200 && !lastTimeStatus) {
                channel.send('@everyone VPN andando');
                clearInterval(interval);
                lastTimeStatus = true;
                getRespFromSwiss('http://localhost:3000/', 10000);
            } else if (resp.status === 200 && lastTimeStatus) {
                return;
            }
        })
        .catch((error) => {
            clearInterval(interval);
            lastTimeStatus = false;
            getRespFromSwiss('http://localhost:3000/', 5000);
            console.log(`VPN inactiva`);
        });
};

const getRespFromSwiss = (url, intervalTimer) => {
    const interval = setInterval(() => {
        pingToSwiss(url, interval);
    }, intervalTimer);
};

// http://smg-devtools.swm.com.ar/smmp-wiki/index.php/Categor%C3%ADa:SGI
getRespFromSwiss('http://localhost:3000/', 5000);

client.login(process.env.TOKEN);
