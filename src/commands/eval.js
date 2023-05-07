const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Write code")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("Create a username")
        .setRequired(true)
    ),
  async execute(interaction) {
    const code = interaction.options.getString("code");

    function humanize(value) {
      var humanized = humanizeDuration(value, {
        round: true,
        units: ["y", "mo", "w", "d", "h", "m", "s", "ms"],
      });
      return humanized.replaceAll("milliseconds", "ms");
    }

    let output;
    try {
      const started = new Date().getTime();
      output = eval(code);
      if (output instanceof Promise) {
        output = await output;
      }

      const timeTook = new Date().getTime() - started;

      if (code.length > 4096) {
        output = new AttachmentBuilder(Buffer.from(output), "evaluation.txt");
        return await interaction.reply({ files: output });
      } else {
        console.log(output);
        return await interaction.reply({
          content: `\`\`\`js\n${JSON.stringify(output, null, 2)}\`\`\``,
          ephemeral: true,
        });
        // return await EmbedBuilder.buildEmbed(interaction, `Evaluated in ${humanize(timeTook)}`, (embed) => embed
        //     .setDescription(codeBlock('js', output))
        //     .setTimestamp()
        // );
      }
    } catch (err) {
      return console.log(err);
    }
  },
};
