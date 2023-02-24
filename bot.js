const Discord = require('discord.js');
const { spawn } = require('child_process');
const https = require('https');

const client = new Discord.Client();
const PREFIX = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! Made By Rewin`);
});

client.on('message', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'api') {
    if (args.length < 4) {
      message.channel.send('Error: Invalid arguments');
      return;
    }
    const host = args[0];
    const port = args[1];
    const time = args[2];
    const method = args[3];
    const url = `https://api/api/api.php?username=rewin55&key=rewin55&host=${host}&port=${port}&time=${time}&method=${method}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`API response: ${data}`);
        message.channel.send(`API response: ${data}`);
      });
    }).on('error', (err) => {
      console.error(`API request error: ${err}`);
      message.channel.send(`API request error: ${err}`);
    });
  } else if (command === 'api2') {
    if (args.length < 4) {
      message.channel.send('Error: Invalid arguments');
      return;
    }
    const host = args[0];
    const port = args[1];
    const time = args[2];
    const method = args[3];
    const url = `https://api/&key=rewin55&host=${host}&port=${port}&time=${time}&method=udp`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`API response: ${data}`);
        message.channel.send(`API response: ${data}`);
      });
    }).on('error', (err) => {
      console.error(`API request error: ${err}`);
      message.channel.send(`API request error: ${err}`);
    });
  } else if (command === 'ssh') {
    if (args.length < 2) {
      message.channel.send('Error: Invalid arguments');
      return;
    }
    const host = args[0];
    const time = args[1];
    message.channel.send(`Sending SSH command to ${host}`);

    const sshProcess = spawn('ssh', [`node`, `http-raw.js`, `${host}`, `${time}`]);
    sshProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      message.channel.send(`stdout: ${data}`);
    });
    sshProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      message.channel.send(`stderr: ${data}`);
    });
    sshProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      message.channel.send(`SSH command exited with code ${code}`);
    });
  } else if (command.startsWith('ping')) {
    const args = command.split(' ');
    const ip = args[1] || 'there your value';

    const pingProcess = spawn('ping', ['-t', ip]);
    let timeout;

    pingProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        message.channel.send(`stdout: ${data}`);
    });

    pingProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        message.channel.send(`stderr: ${data}`);
    });

    pingProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        message.channel.send(`Ping command exited with code ${code}`);
        clearTimeout(timeout);
    });

    timeout = setTimeout(() => {
        console.log('Ping command timed out');
        message.channel.send('Ping command timed out');
        pingProcess.kill();
    }, 2000);
} else {
    message.channel.send(`Error: Invalid command`);
  }
});

client.login('MTA3Njk5NzI5OTAzODg0NzAxNg.GLAEzB.dC_WKjIPLhgoJRBOLVhGVOw6foGDpiyMY3ft0Y');