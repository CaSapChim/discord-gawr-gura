const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Display target avatar",
    options: [
        {
            name: "target",
            description: "Choose a target",
            type: 6
        }
    ],
    execute: async (ctx) => {
        const target = await ctx.fetch.getUser(
            ctx.args[0]?.user || 
            ctx.args[0] ||
            ctx.author
        )
        if (!target) return ctx.error("❌ Cannot fetch that user!")

        await ctx.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: target.tag, iconURL: target.displayAvatarURL() })
                    .setImage(target.displayAvatarURL({ size: 4096 }))
                    .setColor(target.hexAccentColor || ctx.bot.config.embed.defaultColor)
            ]
        })
    }
}