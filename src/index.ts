import { Client, Intents } from 'discord.js';
import { config } from './config';
import { readdirSync } from 'fs';
import { ButtonHandler, ContextMenuHandler, SlashCommandHandler } from "./types/typings";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

let commands: Array<SlashCommandHandler> = []
readdirSync('commands')
    .filter(name => name.endsWith('.ts'))
    .map(name => name.replace('.ts', ''))
    .forEach(name => {
        import(`./commands/${name}`).then(obj => {
            commands.push(obj);
        });
    });

let contextMenus: Array<ContextMenuHandler> = []
readdirSync('context_menus')
    .filter(name => name.endsWith('.ts'))
    .map(name => name.replace('.ts', ''))
    .forEach(name => {
        import(`./context_menus/${name}`).then(obj => {
            contextMenus.push(obj);
        });
    });

let buttons: Array<ButtonHandler> = []
readdirSync('buttons')
    .filter(name => name.endsWith('.ts'))
    .map(name => name.replace('.ts', ''))
    .forEach(name => {
        import(`./buttons/${name}`).then(obj => {
            buttons.push(obj);
        });
    });

client.on('ready', () => {
    console.log(`The ${client.user.username} is ready.`);

    let commandManager = client.application.commands;

    commands.forEach(cmd => commandManager.create(cmd.declaration));
    contextMenus.forEach(contextMenu => commandManager.create(contextMenu.declaration))
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const commandName = interaction.commandName
        for (const command of commands) {
            if (command.declaration.name === commandName) {
                await command.execute(interaction);
                break;
            }
        }
    } else if (interaction.isButton()) {
        const customId = interaction.customId
        for (const button of buttons) {
            if (button.id === customId) {
                await button.execute(interaction);
                break;
            }
        }
    } else if (interaction.isContextMenu()) {
        const contextName = interaction.commandName
        for (const contextMenu of contextMenus) {
            if (contextMenu.declaration.name === contextName) {
                await contextMenu.execute(interaction);
                break;
            }
        }
    }
});

try {
    client.login(config.token);
} catch (err) {
    console.log('The token specified in the config.ts file is invalid.');
}

export { client };
