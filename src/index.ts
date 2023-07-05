require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on(
    'ready',
    (client: {
        user: { setActivity: (arg0: { name: string; type: any }) => void };
    }) => {
        console.log('Bot prendido');
        client.user.setActivity({
            name: 'Checking Status',
            type: ActivityType.Playing,
        });
    }
);

let lastTimeStatus = false;
let interval: ReturnType<typeof setInterval>;
let count = 0;

const pingToSwiss = (url: string) => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    fetch(url)
        .then((resp) => {
            console.log(resp.status);
            if (resp.status === 200 && !lastTimeStatus) {
                channel.send('@everyone VPN andando');
                clearInterval(interval);
                lastTimeStatus = true;
                getRespFromSwiss(process.env.URL as string, 10000);
            } else if (resp.status === 200 && lastTimeStatus) {
                return;
            }
        })
        .catch((error: Error) => {
            clearInterval(interval);
            if(lastTimeStatus){
                channel.send('@everyone VPN caida')
            }
            lastTimeStatus = false;
            count = count + 1;
            console.log(`VPN inactiva ${count}`);
            getRespFromSwiss(process.env.URL as string, 10000);
        });
};

const getRespFromSwiss = (url: string, intervalTimer: number) => {
    interval = setInterval(() => {
        pingToSwiss(url);
    }, intervalTimer);
};

getRespFromSwiss(process.env.URL as string, 5000);

client.login(process.env.TOKEN);
