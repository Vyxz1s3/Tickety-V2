const { SlashCommandBuilder } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add a user to the current ticket')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to add').setRequired(true)
    ),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser('user');

      const embed = successEmbed(
        'User Added',
        `${user} has been added to this ticket.`
      );

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const embed = errorEmbed(
        'Error',
        'Something went wrong while adding the user. Please try again.'
      );
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
