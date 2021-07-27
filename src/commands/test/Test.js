const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Test extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    message.channel.send('Test command works');
  }
}