require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = "-";


const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection;
let data = [];
for(const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
    data.push({name:command.name, description:command.description, options:command.options})
}

client.on('ready', async () => {
    console.log('Logged in')
    await client.guilds.cache.get(process.env.GUILD)?.commands.set(data)
});





client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    if(!client.commands.has(interaction.commandName)) return
    const command = client.commands.get(interaction.commandName);
    try {
        await command.execute(interaction)
    } catch {
        console.log("error")
    }
})



client.login(process.env.TOKEN)