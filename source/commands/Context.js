const { ChatInputCommandInteraction, Message, EmbedBuilder } = require("discord.js")

class Context {
    constructor(context) {
        this.context = context
    }

    get bot() {
        return this.context.client
    }

    get message() {
        return this.context instanceof Message ? this.context : null
    }

    get interaction() {
        return this.context instanceof ChatInputCommandInteraction ? this.context : null
    }

    get author() {
        return this.context.user || this.context.author
    }

    get member() {
        return this.context.member
    }

    get guild() {
        return this.context.guild
    }

    get guildId() {
        return this.context.guildId
    }

    async send(options) {
        if (typeof options === "string") 
            options = { content: options }

        if (this.message) {
            return await this.context.channel.send({ ...options, allowedMentions: { users: false } });
        } else {
            if (this.context.replied || this.context.deferred) {
                return await this.context.followUp({ ...options, fetchReply: true })
            } else {
                return await this.context.reply({ ...options, fetchReply: true })
            }
        }
    }

    async reply(options) {
        return await this.send({ ...options, allowedMentions: { users: true } })
    }

    async error(content) {
        return await this.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(content)
                    .setColor("Red")
            ],
            ephemeral: true
        })
    }
}

module.exports = Context;
