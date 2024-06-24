const express = require('express');
const mineflayer = require('mineflayer');

const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const botUsername = 'Test'; // Replace with your desired bot username
const botServer = '104.128.55.48'; // Replace with the Minecraft server address
const botPort = 25571; // Replace with the Minecraft server port

let botRunning = false;
let bot; // Initialize bot outside the functions

function startBot() {
    if (!botRunning) {
        bot = mineflayer.createBot({
            host: botServer,
            username: botUsername,
            port: botPort
        });
        bot.on('spawn', () => {
            console.log('Bot spawned.');
            bot.chat('/login holaxd');
            // bot.chat('/login Medellin1!');
            bot.setControlState('jump', true);
            setTimeout(() => {
                bot.chat('Hola :D');
            }, 3000);
        });
        botRunning = true;
    }
}

function stopBot() {
    bot.chat('Adioh')
    setTimeout(() => {
        bot.quit();
    }, 300);
    botRunning = false;
    console.log('Bot stopped.');
}

// Express routes
app.get('/start', (req, res) => {
    startBot();
    res.send('Bot started.');
});

app.get('/stop', (req, res) => {
    stopBot();
    res.send('Bot stopped.');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
