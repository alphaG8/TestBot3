const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'Fun', []);
  }

  async run(client, message, args) {
    const messageToSay  = args.join(" ");
    const sayEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} Says: ${messageToSay}`)
      .setFooter(message.author.tag ,message.author.displayAvatarURL())
      .setColor('#84daf8')
      .setTimestamp()
      .setURL('https://www.youtube.com/watch?v=w0AOGeqOnFY');
    try {
      message.channel.send(sayEmbed)
    } catch (err) {
      console.log(err)
      message.reply('I am unable to say that message.')
    }
  }
}