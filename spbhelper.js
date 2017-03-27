const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({autoReconnect:true});
var timer;

const prefix = "/";
const SPB_ServID = "240843640375607296";
var commands = ["spbinfo","pools","help","rundown", "big"];
var pools = ["shitposthony","costanza","dank","deathgrips","gabe","jojo","lights","rnm","banan","spongebob","mystery", "trap"];
var b_cooldown=false;

//Events
client.on('disconnect', () => {
  clearTimeout(timer);
  console.log("Lost Connection... will reconnect in 2 minutes");
  connectbot(2);
});

client.on('ready', () => {
  console.log(`ShitPostBot Helper Loaded`);
});

client.on('message', msg => {
//make sure it is a text channel
if ( (msg.channel.type != 'dm') && (msg.content.startsWith(prefix))) {
  //console.log("Message Received.");
  if (b_cooldown) {
    msg.channel.send("**ShitPostBot Helper Userbot** \
      \nPlease wait about three seconds before using me again. Thanks :)");
  }
  else if (b_cooldown != true) {
    //console.log("Cooldown is false!")
    if ( msg.guild.id === SPB_ServID ) {
    //console.log("This is SPB Server")
      //Begin command list
      var usermsg = msg.content;
      for (var i = 0; i < commands.length; i++) {
        if (usermsg.startsWith(prefix+commands[i])) {
          console.log("SPB Helper: Sending command "+usermsg+" ("+msg.author.username+")")
          trigCommand(commands[i],msg);
          break;
        }
      }

      //console.log(`SPB Bot triggered by: ${msg.author.username}`);
      b_cooldown = true;
      myTimer();
    }
  }
}
});


//Functions
function connectbot(mins) {
  timer = setTimeout(function(){client.login(require('./token.json').token)},60000*mins);
}


function myTimer() {
  setTimeout(function(){b_cooldown = false;},3000);
}

function trigCommand(cmd,usrmsg) {
  if (cmd==="spbinfo") {
    var parse = usrmsg.content.split(" ");
    if (parse[1]===undefined) {
      usrmsg.channel.send("!spbinfo");
    }
    if (parse[1]!=undefined) {
      usrmsg.channel.send("!spbinfo "+parse[1]);
    }
  }
  if (cmd==="pools") {
    var list="";
    for (var i = 0; i < pools.length; i++) {
      list += pools[i]+"\n"
    }
    usrmsg.channel.send("**ShitPostBot Helper Userbot** \
      \nList of Pools are:\
      \n\`\`\`\n"+list+"\n\`\`\`");
  }
  if (cmd==="help") {
    usrmsg.channel.send("**ShitPostBot Helper Userbot** \
      \nList of Commands are:\
      \n\`\`\`\n/help -- List of commands\
      \n/pools -- List of Pools to use with !spb pools=\
      \n/spbinfo -- Sends a !spbinfo <discord id> from me\
      \n/rundown -- Gives you a quick rundown...\
      \n/big -- Sends a !big <message> from me\
      \n\`\`\`");
  }
  if(cmd==="rundown") {
    usrmsg.channel.send(`Long ago in a distant land, I, Aku, the shape shifting master of darkness, unleashed an unspeakable evil.\nBut a foolish samurai warrior wielding a magic sword stepped forth to oppose me. Before the final blow was struck, I tore open a portal in time, and flung him into the future where my evil is law. Now the fool seeks to return to the past and undo the future that is Aku.\nhttps://upload.wikimedia.org/wikipedia/en/b/b3/Samurai_Jack_season_five_poster.jpg`)
  }
  if(cmd==="big") {
    usrmsg.channel.send("!big "+ usrmsg.content.substring(5));
  }
}

client.login(require('./token.json').token);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
