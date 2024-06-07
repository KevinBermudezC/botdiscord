//archivo index js
import { Client, Events, Message } from "discord.js";
import dotenv from 'dotenv'
import {run} from './commands/say.js'
import {avatar} from './commands/avatar.js'

dotenv.config()

//crear un nuevo cliente de discord
const client = new Client({
    intents: 3276799
});

//creando el primer evento
client.on(Events.ClientReady, async() => {
    console.log(`Conectado como ${client.user.username}!`)
});

//Respuesta a mensajes
client.on(Events.MessageCreate, async(message) =>{
    if(message.author.bot) return; //Si el autor del mensaje es un bot no responda.
    if(!message.content.startsWith('.')) return; //si el contenido no inicia con "." ignorar.

    const args = message.content.slice(1).split(' ')[0] // el contenido del mensaje menos 1 caracter (.)

    //text command handler
    try {
        if (args === 'say') {
            run(message);
        } else if (args === 'avatar') {
            avatar(message);
        } else {
            message.reply('Comando no reconocido.')
        }
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando .${args}`, error.message);
    }
})
//conectar cliente al discord
client.login(process.env.DISCORD_TOKEN)