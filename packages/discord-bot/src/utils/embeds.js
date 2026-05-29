const { EmbedBuilder } = require('discord.js');
const { EMBED_COLOR } = require('../constants/colors');

/**
 * Creates a base EmbedBuilder pre-configured with the bot's standard color.
 * All embed helpers in this file use this as their foundation so the color
 * stays consistent across every response.
 *
 * @returns {EmbedBuilder}
 */
function createBaseEmbed() {
  return new EmbedBuilder().setColor(EMBED_COLOR);
}

/**
 * Builds a success embed (green check-mark style title, standard color).
 *
 * @param {string} title
 * @param {string} description
 * @returns {EmbedBuilder}
 */
function successEmbed(title, description) {
  return createBaseEmbed()
    .setTitle(`✅ ${title}`)
    .setDescription(description)
    .setTimestamp();
}

/**
 * Builds an error embed.
 *
 * @param {string} title
 * @param {string} description
 * @returns {EmbedBuilder}
 */
function errorEmbed(title, description) {
  return createBaseEmbed()
    .setTitle(`❌ ${title}`)
    .setDescription(description)
    .setTimestamp();
}

/**
 * Builds an informational embed.
 *
 * @param {string} title
 * @param {string} description
 * @returns {EmbedBuilder}
 */
function infoEmbed(title, description) {
  return createBaseEmbed()
    .setTitle(`ℹ️ ${title}`)
    .setDescription(description)
    .setTimestamp();
}

/**
 * Builds a warning embed.
 *
 * @param {string} title
 * @param {string} description
 * @returns {EmbedBuilder}
 */
function warnEmbed(title, description) {
  return createBaseEmbed()
    .setTitle(`⚠️ ${title}`)
    .setDescription(description)
    .setTimestamp();
}

module.exports = { createBaseEmbed, successEmbed, errorEmbed, infoEmbed, warnEmbed };
