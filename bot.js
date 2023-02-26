const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');

const client = new Discord.Client();
const PREFIX = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'adsoyad') {
    if (args.length < 2) {
      message.channel.send('Error: Invalid arguments');
      return;
    }

    const ad = args[0];
    const soyad = args[1];
    const url = `http://api.com/api/adsoyad.php?ad=${ad}&soyad=${soyad}`;

    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`API response: ${data}`);
        fs.writeFile('info.txt', data, (err) => {
          if (err) {
            console.error(`Error writing to file: ${err}`);
            message.channel.send(`Error writing to file: ${err}`);
          } else {
            console.log('File written successfully!');
            const attachment = new Discord.MessageAttachment('./info.txt');
            message.channel.send('info Çıkarıldı:', attachment);
          }
        });
      });
    }).on('error', (err) => {
      console.error(`API request error: ${err}`);
      message.channel.send(`API request error: ${err}`);
    });
  }
});

client.login('bottoken');
