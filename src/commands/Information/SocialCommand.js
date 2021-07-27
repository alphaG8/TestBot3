const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('social', 'Information', []);
  }

  async run(client, message, args) {
    const youtubeEmbed = new Discord.MessageEmbed()
    .setTitle("Coconut :D")
    .setURL("https://www.youtube.com/watch?v=w0AOGeqOnFY")
    .setThumbnail("https://cdn.discordapp.com/attachments/862587791586492416/868745704225533993/th.png")
    .setColor("#b31217")
    .addField("Da Coconut Song :D", "I Like Coconut :D")
    .setTimestamp()
    .setFooter("COCONUT");
  message.channel.send(youtubeEmbed).catch(err => console.log(err));
  }
}