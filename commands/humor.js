import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY2;

export async function humor() {
    try {
        const response = await fetch('https://api.imgflip.com/get_memes', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json();
        //console.log(data); // ver respuesta en consola

        if (!data || !data.data || !Array.isArray(data.data.memes) || data.data.memes.length === 0) {
            throw new Error('No se encontraron memes');
        }

        const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
        return randomMeme.url;
    } catch (error) {
        console.log('Error al obtener memes', error);
        return null;
    }
}
