import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY
export async function getMemes(){
    try {
        const response = await fetch("https://programming-memes-images.p.rapidapi.com/v1/memes", {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY
            }
        });
        if(!response.ok){
            throw new Error(`Error en la peticion: ${response.statusText}`);
        };

        const data = await response.json()
        const randomMeme = data[Math.floor(Math.random()* data.length)];
        return randomMeme.image;
    } catch (error) {
        console.log('Error al obtener memes',error)
        return null;
    }
}