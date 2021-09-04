const { CommandInteraction } = require('discord.js');

module.exports = {
    name : 'ping',
    description: 'pong',

    /**
     * @param {CommandInteration} interaction
     */

    async execute(interaction) {
        await interaction.reply('pong');
    }
}
