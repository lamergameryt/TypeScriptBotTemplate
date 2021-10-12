// noinspection JSUnusedGlobalSymbols

import { ApplicationCommandDataResolvable, CommandInteraction } from "discord.js"

export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!')
}

export const declaration: ApplicationCommandDataResolvable = {
    name: 'ping',
    description: 'Replies with Pong!'
}
