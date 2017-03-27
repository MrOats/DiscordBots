const Discord = require("discord.js");
const client = new Discord.Client();
const workchannel = '259328254794530816';
const tatsumaki_id = '172002275412279296';
var workname;
var credits = 0;
var timer;
var isconnect = false;
//Events
client.on('disconnect', () => {
  clearTimeout(timer);
  isconnect = false;
  console.log("Lost Connection... will reconnect in 2 minutes");
  connectbot(2);
});

client.on('ready', () => {
  console.log(`Fishbot 5000 is running!`);
  isconnect = true;
  client.channels.get(workchannel).sendMessage('t!credits');
  workname = client.user.username;
});

client.on('message', msg => {
  if (msg.author.id === tatsumaki_id) {
//Check if credits
    if ( msg.content.includes(workname) && msg.content.includes("balance") ) {

      credits = updateCredits(msg.content);
      console.log(time()+" - REBALANCE: Fixed varible back to: " + credits + " credits!");
      if (credits >= 10) {
        //Clear timer just in case it loops back to here and messages double
        clearTimeout(timer);
        sleep();
      }
      else if (credits < 10) {
        client.destroy();
        process.exit();
        //Hopefully that stops everything...
      }

    }
//Check if you fished
    else if ( msg.content.includes(workname) && msg.content.includes("caught:") ) {

      credits-=10;
      console.log(time()+" - You fished for 10 credits. "+ credits + " credits remain.");
      sleep();

    }
//Check if command delay
    else if ( msg.content.includes(workname) && msg.content.includes("seconds") ) {

      console.log("Stupid Tatsumaki, hurry up.");
      clearTimeout(timer);
      sleep();

    }
  }
});

//Functions

function updateCredits(message) {
  var foundarr = message.match(/\d+/g);
  return foundarr[0];
}

function sleep() {
  timer = setTimeout(doFish,29050);
}

function connectbot(mins) {
  if (!isconnect) {
    timer = setTimeout(function(){client.login(token)},60000*mins);
  }
}

function time() {
  var d = new Date();
  return d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}

function doFish() {
  if (credits >= 10) {
    client.channels.get(workchannel).sendMessage('t!fishy');
  }
  else if (credits < 10) {
    client.channels.get(workchannel).sendMessage('t!credits');
  }
}

client.login(require('./token.json').token);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
