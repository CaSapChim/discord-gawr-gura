const {
    Client,
    GatewayIntentBits,
    Partials,
    GatewayVersion,
    Collection,
    Routes,
} = require("discord.js")
const path = require("path")
const fs = require("fs")

class Gura extends Client {
    constructor() {
        super({
            intents: Object.values(GatewayIntentBits),
            partials: Object.values(Partials),
            rest: { version: GatewayVersion },
            shards: "auto"
        })

        this.config = require("./config")
        this.commands = new Collection()
    }

    async handleCommands() {
        const commands = [];

        const commandsPath = path.resolve(__dirname, "commands")
        const commandDirs = fs
            .readdirSync(commandsPath, { withFileTypes: true })
            .filter((target) => target.isDirectory())

        for (const dir of commandDirs) {
            const commandFiles = fs
                .readdirSync(`${commandsPath}/${dir.name}`, { withFileTypes: true })
                .filter((target) => target.isFile() && target.name.endsWith(".js"))

            for (const file of commandFiles) {
                const command = require(`${commandsPath}/${dir.name}/${file.name}`)

                if (!command) return

                commands.push(command)
                this.commands.set(command.name, command)
            }
        }

        // Registry slash commands

        const { rest } = this
        rest.setToken(this.config.botToken)

        const currentUser = await rest.get(Routes.user())

        try {
            await rest.put(Routes.applicationCommands(currentUser.id), {
                body: commands
            })
        } catch (error) {
            console.error(error)
        }
    }

    handleEvents() {
        const eventsPath = path.join(__dirname, "events")
        const eventDirs = fs
            .readdirSync(eventsPath, { withFileTypes: true })
            .filter((target) => target.isDirectory())
        
        for (const dir of eventDirs) {
            const eventFiles = fs
                .readdirSync(`${eventsPath}/${dir.name}`, { withFileTypes: true })
                .filter((target) => target.isFile() && target.name.endsWith(".js"))

            for (const file of eventFiles) {
                const event = require(`${eventsPath}/${dir.name}/${file.name}`)

                if (!event) return

                event.once
                    ? this.once(event.name, (...args) => event.execute(...args))
                    : this.on(event.name, (...args) => event.execute(...args))
            }
        }
    }

    launch() {
        this.handleEvents()
        this.handleCommands()       
        this.login(this.config.botToken)
    }
}

module.exports = Gura