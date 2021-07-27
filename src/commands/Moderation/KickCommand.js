const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  async run(client, message, args) {
    //E!kick {member} {reason}
    //Permissions Checking:
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have enough permission to use this commands!")
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I dont have enough permission!")

    //Variables:
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    //Input Checking:
    if (!reason) reason = "No Reason Gived";

    //Executing:
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You has been kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#84daf8")
      .setTimestamp()
      .setFooter(client.user.tag ,client.user.displayAvatarURL())
      .setURL('https://www.youtube.com/watch?v=w0AOGeqOnFY')

    //Input Checking2:
    if (!args[0]) return message.reply("You need to ping someone to kick him. \`E!kick @user reason\ ")
    if (!mentionedMember.kickable) return message.channel.send("Sorry i cant kick that member")
    if (!mentionedMember) return message.reply("The member that u mentioned is not in the server.")
    try {
      await mentionedMember.send(kickEmbed)
    } catch (err) {
      console.log('I was unable to message the member!.')
    }

    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      message.channel.send("I was unable to kick the user!.")
    }
  }
}