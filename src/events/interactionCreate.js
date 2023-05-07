const {
  TextInputBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} = require("@discordjs/builders");
const {
  ButtonBuilder,
  ModalBuilder,
  TextInputStyle,
  ButtonStyle,
  AttachmentBuilder,
  Events,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found. Code: 1`
        );
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found. Code: 2`
      );
      return;
    }

    try {
      await command.execute(interaction);
      console.log(`Command ran: ${interaction.commandName}`);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
