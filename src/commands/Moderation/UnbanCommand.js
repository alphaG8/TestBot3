const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'Moderation', []);
  }

  async run(client, message, args) {
    //E!unban {ID} {reason}
    //Permissions Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have enough permission to use this commands!")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I dont have enough permission!")
    
    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    //Input Checking:
    if (!reason) reason = "No Reason Gived";
    if (!args[0]) return message.channel.send("You need to enter someone ID to unban him. \`E!unban ID reason\ ")
    if (isNaN(args[0])) return message.channel.send("The ID is not an number. \`E!unban ID reason\ ")

    //Executing:
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send("This server haven't banned anyone!");
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send("The user ID is not banned");
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err)
        message.channel.send("Something went wrong when unbanning then user ID");
      }).then(() => {
        message.channel.send(`Sucesssfully unbanned <@${args[0]}>`);
      });
    });
  }
}