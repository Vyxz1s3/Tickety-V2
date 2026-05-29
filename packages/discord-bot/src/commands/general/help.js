const { SlashCommandBuilder } = require('discord.js');
const { createBaseEmbed } = require('../../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available Tickety commands'),

  async execute(interaction) {
    const embed = createBaseEmbed()
      .setTitle('Tickety — Help')
      .setDescription('Here is a list of all available commands.')
      .addFields(
        {
          name: '🎫 Ticket Commands',
          value:
            '`/new` — Open a new ticket\n`/close [reason]` — Close the current ticket\n`/add <user>` — Add a user to the ticket\n`/remove <user>` — Remove a user from the ticket',
        },
        {
          name: '⚙️ General Commands',
          value: '`/help` — Show this help message\n`/ping` — Check bot latency',
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
