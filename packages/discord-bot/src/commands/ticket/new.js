const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('new')
    .setDescription('Open a new support ticket'),

  async execute(interaction) {
    try {
      const embed = successEmbed(
        'Ticket Created',
        'Your ticket has been created. A member of staff will be with you shortly.'
      );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      const embed = errorEmbed(
        'Error',
        'Something went wrong while creating your ticket. Please try again.'
      );
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
