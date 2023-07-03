## Hello! this is a bot for discord that warns in a channel if a certain page is online.

### How to make it work?

-   Git clone the repo.

    `git clone https://github.com/Luvwen/check-status.git`

-   Install dependencies.

    `npm i`

-   Create an .env file that contains TOKEN, BOT_ID, SERVER_ID, CHANNEL_ID.

    `echo -e "TOKEN = our_token \n BOT_ID = our_bot_id \n SERVER_ID = our_server_id \n CHANNEL_ID = our_channel_id \n URL = our_url" >> .env`

-   Set the url to check inside index.js file.

    `const URL = 'https://our_url'`

-   Node index.js to run the server.

    `node index.js`
