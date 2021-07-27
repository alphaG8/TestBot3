const { ClientUser, Client } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' has logged in.');
    //set user activity and status
    client.user.setPresence({
      activity: {
        name: `${serverIn} Server`,
        type: 'WATCHING'
      },
        status: 'dnd'
    })
    .catch(console.error);
  client.user.setUsername(`DHASGDHAGWDHSAGWFHAGYFWAYDGSFGASHDGhg`)
    .then(user => console.log(`My New Username Is ${user.username}!`))
    .catch(console.error);
  }
}