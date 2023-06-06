const { ApplicationCommandOptionType } = require("discord.js")
const Context = require("../../commands/Context")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @returns 
     */
    execute: async (interaction) => {
        if (!interaction.isChatInputCommand() || !interaction.guild) return
        interaction.args = interaction.options.data
        const command = interaction.client.commands.get(interaction.commandName)
        const context = new Context(interaction)
        if (!command) return context.error("❌ | This command is outdated!")
        await command.execute(context)
    }
}
