const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'Moderation', []);
  }

  async run(client, message, args) {
    //nuke {reason}
    //Permission Checking:
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have enough permission to use this commands!")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I dont have enough permission!")

    //Variables:
    let reason = args.join(" ");
    const nukeChannel = message.channel;

    //Input Checking:
    if (!reason) reason = "No Reason Gived";
    if (!nukeChannel.deletable) return message.channel.send("This channel is not deleteable")

    //Executing:
    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));

  }
}