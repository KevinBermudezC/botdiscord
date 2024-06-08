import { Client, Events } from "discord.js";
import dotenv from 'dotenv';
import { run } from './commands/say.js';
import { avatar } from './commands/avatar.js';
import { buttons } from './commands/button.js';
import { getMemes } from './commands/memes.js';
import { humor } from './commands/humor.js'

dotenv.config();

// Crear un nuevo cliente de Discord
const client = new Client({
    intents: 3276799
});

// Comandos disponibles
const commands = {
    'say': run,
    'avatar': avatar,
    'buttons': buttons,
    'troll': async (message) => {
        const memeUrl = await getMemes();
        if (memeUrl) {
            message.channel.send(memeUrl);
        } else {
            message.channel.send('No se pudo obtener un meme en este momento');
        }
    },
    'memes': async (message) => {
        const humorUrl = await humor();
        if (humorUrl) {
            message.channel.send(humorUrl);
        } else {
            message.channel.send('No se pudo obtener un meme en este momento');
        }
    }
};

// Creando el primer evento
client.on(Events.ClientReady, async () => {
    console.log(`Conectado como ${client.user.username}!`);
});

// Respuesta a mensajes
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return; // Si el autor del mensaje es un bot no responda.
    if (!message.content.startsWith('.')) return; // Si el contenido no inicia con "." ignorar.

    const args = message.content.slice(1).split(' ')[0]; // El contenido del mensaje menos 1 caracter (.)
    const command = commands[args];

    // Text command handler
    try {
        if (command) {
            await command(message);
        } else {
            message.reply('Comando no reconocido.');
        }
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando .${args}`, error.message);
    }
});

// Evento de bienvenida
client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannelId = '898014522772688900';
    const channel = await client.channels.fetch(welcomeChannelId);
    channel.send(`**<@${member.user.id}> Bienvenido a la comunidad!**🥳`);
});

// Conectar cliente al Discord
client.login(process.env.DISCORD_TOKEN);