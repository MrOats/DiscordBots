const Discord = require("discord.js");
const client = new Discord.Client();

var timer;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

// var triggers = ["What's your name?","What is your name?","what is your name?","what's your name?"];
var servers = ["240843640375607296","222085119496683520","85797238793568256","199901085601759242"];
var exclude_channels = ["271284590755184641","237522487389323264", "85799664527364096"];


//Events
client.on('disconnect', () => {
  clearTimeout(timer);
  console.log("Lost Connection... will reconnect in 2 minutes");
  connectbot(2);
});

client.on('message', msg => {
if (msg.channel.type != 'dm') {

  if ( ( msg.content.search(/name+/i) != -1 ) && ( ( servers.indexOf(msg.guild.id) != -1 ) && ( exclude_channels.indexOf(msg.channel.id) === -1 )) ) {
    msg.channel.send('m̧̜̱͚̻͓͉͎̯̍̾̈̊̈̈̿̾̽̔͜y̙̩͔͈̮͔̝̬̰͈͐̔̊̈́̔̈́̊̄́͝ ̣̘̮̺̻͖̟͕̩̦̏̋̏͆̆̇͒͆̾̚n̡̨̻̙͇̹͈̞͇̹͋̒̆̃̉̍͊́̚͝a̧̩̬̥̱̗̬̝̠̍̃̈́̎͌͗̈́̅̚͜͝m̧̛̗͉͚̠̺̯̻̘̝̏́̎̈̑́̄͗͘ȁ̧̡̛̪̮̙̣̩͕͚͙́̓̈́̃̓̀͗͠ ̡̛̛̲͉͓̲͓͇̞͉̄̇̂̓͒̓̈̇͜j̨̡̯̤͎͖̙̖̗̘̽̅̇̌͊͑͒͐̄̉ę̬͍̻͈̖͎̗̳̲͛̃̏̃͂̌͒̐͌̊f̢̻͍̞͖̜̗̜̅̏̍͋́̌̋̀̎̕͜͜f̨͔̝̘̱̠̜̠̈́͌̾̀̓͋͑̈́̎̓');
    console.log(`Bot triggered by: ${msg.author.username} (${msg.guild.name} in #${msg.channel.name})`);
    //client.channels.get('222088991313231872').sendMessage('Bot got triggered');
  }
}
});


//Functions
function connectbot(mins) {
  timer = setTimeout(function(){client.login(require('./token.json').token);},60000*mins);
}


client.login(require('./token.json').token);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
