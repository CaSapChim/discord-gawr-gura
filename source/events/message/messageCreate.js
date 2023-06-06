const Context = require("../../commands/Context")

module.exports = {
    name: "messageCreate",
    execute: async (message) => {
        if (message.author.bot || !message.guild) return
        const context = new Context(message)
        const prefixes = ["?", "a", "gura", context.bot.user.toString()]
        const prefix = prefixes.find((p) => message.content.toLowerCase().startsWith(p))
        if (!prefix) return
        const [commandName, ...args] = message.content
            .trim()
            .toLowerCase()
            .slice(prefix.length)
            .split(/ +/g)
        const command = 
            context.bot.commands.get(commandName) || 
            context.bot.commands.find((cmd) => cmd.aliases?.includes(commandName))
        if (!command) return
        await command.execute(context)
    }
}
