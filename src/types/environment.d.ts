declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            BOT_ID: string;
            SERVER_ID: string;
            CHANNEL_ID: string;
            URL: string;
        }
    }
}

export {};
