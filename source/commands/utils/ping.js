const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Display bot latency",
    execute: async (ctx) => {
        const message = await ctx.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Ping...`)
                    .setColor("Green")
            ]
        })

        await message.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Pong! ${Math.round(Date.now() - message.createdTimestamp)}ms!`)
                    .setColor("Green")
            ],
        })
    }
}
