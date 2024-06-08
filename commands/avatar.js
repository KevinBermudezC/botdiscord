import { EmbedBuilder } from "discord.js";
export const description = 'Hace display del avatar'
export async function avatar(message) {
    const target = message.mentions.users.first() || message.author;
    const member = await message.guild.members.fetch(target.id);

    if(!member) return message.reply('Introduce un usuario valido');
    const avatar = member.user.displayAvatarURL({size: 512})
    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle(`Avatar de <@${member.user.displayName}>`)
        .setImage(avatar)
    
    message.reply({embeds : [embed]})       
}