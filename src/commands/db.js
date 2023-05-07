const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("db")
    .setDescription("db")
    .addStringOption((option) =>
      option.setName("query").setDescription("db query").setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString("query");
    const res = await interaction.client.db.get(query);
    let json = JSON.stringify(res, null, 2);

    console.log(json);

    await interaction.reply({
      content: `\`\`\`js\n/db query: ${query}\`\`\`\n>>> ` + json,
      ephemeral: true,
    });
  },
};
