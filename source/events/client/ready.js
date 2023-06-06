module.exports = {
    name: "ready",
    once: true,
    execute: async (bot) => {
        console.log("Bot đã đăng nhập tại: ", bot.user.tag)
    }
}
