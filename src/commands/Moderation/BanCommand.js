const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'Moderation', []);
  }

  async run(client, message, args) {
    //E!ban {member} {reason}
    //Permissions Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have enough permission to use this commands!")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I dont have enough permission!")
    
    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking:
    if (!reason) reason = "No Reason Gived";
    if (!args[0]) return message.channel.send("You need to ping someone to ban him. \`E!ban @user reason\ ")
    if (!mentionedMember) return message.channel.send("Member that u mentioned is not in the server")
    if (!mentionedMember.bannable) return message.channel.send("Sorry i cant ban that member")

    //Executing:
    const banEmbed = new Discord.MessageEmbed()
    .setTitle(`You has been banned from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("#84daf8")
    .setTimestamp()
    .setFooter(client.user.tag ,client.user.displayAvatarURL())
    .setURL('https://www.youtube.com/watch?v=w0AOGeqOnFY')

  await mentionedMember.send(banEmbed).catch(err => console.log(err));
  await mentionedMember.ban({
    days: 7,
    reason: reason
  }).catch(err => console.log(err)).then(() => message.channel.send(`<@${mentionedMember.user.id}> Has been banned`));
  }
}