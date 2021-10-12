// noinspection JSUnusedGlobalSymbols

import { ApplicationCommandDataResolvable, ContextMenuInteraction } from "discord.js";

export async function execute(interaction: ContextMenuInteraction) {
    await interaction.reply("The interactions works!");
}

export const declaration: ApplicationCommandDataResolvable = {
    name: 'Sample Context Menu',
    type: 'MESSAGE'
}