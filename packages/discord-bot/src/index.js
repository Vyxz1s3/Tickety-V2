require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

// ── Commands ──────────────────────────────────────────────────────────────────
client.commands = new Collection();

const commandDirs = ['ticket', 'general'];

for (const dir of commandDirs) {
  const commandsPath = path.join(__dirname, 'commands', dir);
  if (!fs.existsSync(commandsPath)) continue;

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((f) => f.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`[Tickety] Skipping ${file} — missing "data" or "execute".`);
    }
  }
}

// ── Events ────────────────────────────────────────────────────────────────────
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((f) => f.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// ── Login ─────────────────────────────────────────────────────────────────────
client.login(process.env.DISCORD_TOKEN);
