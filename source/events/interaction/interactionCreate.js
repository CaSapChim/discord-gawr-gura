const Context = require("../../commands/Context")

module.exports = {
    name: "interactionCreate",
    execute: async (interaction) => {
        if (!interaction.isChatInputCommand() || !interaction.guild) return
        const context = new Context(interaction)
        const command = context.bot.commands.get(interaction.commandName)
        if (!command) return context.error("❌ | This command is outdated!")
        await command.execute(context)
    }
}
