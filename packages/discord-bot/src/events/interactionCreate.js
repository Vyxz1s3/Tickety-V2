const { Events } = require('discord.js');
const { errorEmbed } = require('../utils/embeds');

module.exports = {
  name: Events.InteractionCreate,
  once: false,

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      const embed = errorEmbed(
        'Unknown Command',
        `No command matching \`/${interaction.commandName}\` was found.`
      );
      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(`[Tickety] Error executing /${interaction.commandName}:`, err);

      const embed = errorEmbed(
        'Command Error',
        'An unexpected error occurred while running this command.'
      );

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [embed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
  },
};
