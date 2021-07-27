const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have enough permission to use this commands!");
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I dont have enough permission!")
    if (!args[0]) return message.channel.send("You must input a number of messages to purge. \`E!purge member\`")
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("Number that u inputed is not valid number.")
    if (!Number.isInteger(amountToDelete)) return message.channel.send("Number that inputed must be a whole number")
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send("The number that inputed must be between 2 and 100")
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`Deleted ${messages.size} messages!`))
    } catch (err) {
      console.log(err);
      message.channel.send("I was unable to delete the inputed amount, make sure they are within 14 days old.")
    }
  }
}