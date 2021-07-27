const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'Moderation', []);
  }

  async run(client, message, args) {
    //E!nickname {member} {nickname}
    //Permission Checking:
    if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You dont have enough permission to use this commands!")
    if(!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("I dont have enough permission")

    //Variables:
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    //Input Checking:
    if (!args[0]) return message.channel.send("You must ping someone to change a nickname")
    if (!mentionedMember) return message.channel.send("The member that u mentioned is not in the server")
    if (!nickName) return message.channel.send("You must give a nickname for the member")
    if (!mentionedMember.kickable) return message.channel.send("I cannot change that members nickname")

    //Executing
    await mentionedMember.setNickname(nickName).catch(err => console.log(err)
    .then(message.channel.send("Hey i cant change his nickname due to an error, make sure the name it between 2 and 32 characters.")));

  }
}