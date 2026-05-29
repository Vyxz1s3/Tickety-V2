const { SlashCommandBuilder } = require('discord.js');
const { createBaseEmbed } = require('../../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot\'s current latency'),

  async execute(interaction) {
    const sent = await interaction.deferReply({ fetchReply: true });

    const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;
    const wsHeartbeat = interaction.client.ws.ping;

    const embed = createBaseEmbed()
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Roundtrip', value: `${roundtrip}ms`, inline: true },
        { name: 'WebSocket', value: `${wsHeartbeat}ms`, inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
