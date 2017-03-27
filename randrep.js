const Chance = require('chance');
const chance = new Chance();
const Discord = require("discord.js");
const client = new Discord.Client();

const SPB_ServID = "240843640375607296";

client.on('ready', async () => {

  const obj_server = client.guilds.get(SPB_ServID);
  await refreshMembers();
  const obj_members = obj_server.members.array();
  console.log('Choosing random person to t!rep...');
  var chosenid = chooseRand(obj_members).id;
  client.channels.get(SPB_ServID).sendMessage('t!rep <@'+chosenid+'>');
  //client.destroy();
  //process.exit();

});

async function refreshMembers() {

  const obj_server = client.guilds.get(SPB_ServID);
  var {members: coll_members} = await obj_server.fetchMembers();
  return coll_members;
  //console.log(members);

}

function chooseRand(xmembers) {

  var chosen;
  do {
    chosen = xmembers[chance.integer({min: 0, max: xmembers.length})];
  } while ((chosen.id === client.user.id) || (chosen.user.bot));
/*  while (x < xmembers.length) {
    // Debugger loop
    //chosen = xmembers[chance.integer({min: 0, max: xmembers.length})];
    console.log(xmembers[x].user.username);
    x++;
  }
*/
    console.log("Chose "+chosen.user.username);
    return chosen;

}

client.login(require('./token.json').token);
