import {
    ApplicationCommandDataResolvable,
    ButtonInteraction,
    CommandInteraction,
    ContextMenuInteraction
} from "discord.js"

export interface SlashCommandHandler {
    declaration: ApplicationCommandDataResolvable
    execute(interaction: CommandInteraction): void
}

export interface ButtonHandler {
    id: string
    execute(interaction: ButtonInteraction): void
}

export interface ContextMenuHandler {
    declaration: ApplicationCommandDataResolvable
    execute(interaction: ContextMenuInteraction): void
}