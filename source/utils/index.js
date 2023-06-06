exports.Fetch = class {
    constructor(ctx) {
        this.ctx = ctx
        this.bot = ctx.bot
    }

    async getUser(user) {
        const userId = user?.id || user?.match(/[0-9]+/)?.[0]
        if (!userId) return
        return await this.bot.users.fetch(userId, { force: true }).catch(() => null)
    }
}
