// noinspection JSUnusedGlobalSymbols

import { ButtonInteraction } from "discord.js";

export async function execute(interaction: ButtonInteraction) {
    await interaction.reply(`I was pressed by ${interaction.user.username}.`);
}

export const id = "test_button"
