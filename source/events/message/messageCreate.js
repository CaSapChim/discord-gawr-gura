const Context = require("../../commands/Context")

module.exports = {
    name: "messageCreate",
    execute: async (message) => {
        if (message.author.bot || !message.guild) return
        const prefixes = ["?", "a", "gura", message.client.user.toString()]
        const prefix = prefixes.find((p) => message.content.toLowerCase().startsWith(p))
        if (!prefix) return
        const [commandName, ...args] = message.content
            .slice(prefix.length)
            .trim()
            .toLowerCase()
            .split(/ +/g)
        const command =
            message.client.commands.get(commandName) ||
            message.client.commands.find((cmd) => cmd.aliases?.includes(commandName))
        message.commandName = commandName
        message.args = args
        const context = new Context(message)
        if (!command) return
        await command.execute(context)
    }
}
