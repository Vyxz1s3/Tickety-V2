const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a user from the current ticket')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to remove').setRequired(true)
    ),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser('user');

      const embed = successEmbed(
        'User Removed',
        `${user} has been removed from this ticket.`
      );

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const embed = errorEmbed(
        'Error',
        'Something went wrong while removing the user. Please try again.'
      );
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
