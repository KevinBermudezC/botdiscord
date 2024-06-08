import { ButtonBuilder, ActionRowBuilder } from "discord.js";

const usernameButton = new ButtonBuilder()
    .setCustomId ('username')
    .setEmoji('🥳')
    .setLabel('Mostrar nombre de usuario.')
    .setStyle(1);

const avatarButton = new ButtonBuilder()
    .setCustomId ('avatar')
    .setEmoji('🖼️')
    .setLabel('Mostrar avatar de usuario.')
    .setStyle(2);

export const description = 'Envia dos botones, uno envia el nombre del usuario y otro la imagen'
export async function buttons(message) {
    const actionRow = new ActionRowBuilder().addComponents(usernameButton, avatarButton);
    const reply = await message.reply({components : [actionRow]})    
    const target = message.mentions.users.first() || message.author;
    
    //crear un recolector de mensajes
    const filter = (interaction) => interaction.user.id === message.author.id && interaction.message.id === reply.id;
    const collector = message.channel.createMessageComponentCollector({
        filter, time: 60*1000 //1 minuto de duracion
    });
    collector.on('collect', async (interaction)=> {
        if(interaction.customId === "username"){
            interaction.update({
                content: `Tu nombre es **${message.author.displayName}**`,
                components: []
            });
        } else if( interaction.customId === "avatar" ){
            //avatar
            const member = await message.guild.members.fetch(target.id);
            const avatar = member.user.displayAvatarURL({size: 512})
            //respuesta
            interaction.update({
                content: 'Tu imagen de perfil es',
                files: [avatar],
                components: []
            });
        };
    });
    //cuando termine el collector al minuto
    collector.on('end',async () => {
        reply.edit({components: []}).catch(console.error);
    })
};