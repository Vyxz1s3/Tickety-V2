const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed, warnEmbed } = require('../../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Close the current ticket')
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for closing the ticket')
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const reason = interaction.options.getString('reason') ?? 'No reason provided';

      const embed = warnEmbed(
        'Ticket Closing',
        `This ticket is being closed.\n**Reason:** ${reason}`
      );

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const embed = errorEmbed(
        'Error',
        'Something went wrong while closing the ticket. Please try again.'
      );
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
