import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de TikTok.`;

    try {
        const apiUrl = `https://api.lolhuman.xyz/api/tiktok?apikey=Gata_Dios&url=${encodeURIComponent(args[0])}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.reply('Descargando el video, por favor espera...');

            const data = await response.json();
            const videoUrl = data.result.link;

            const fileName = "tiktok.mp4";

            const videoResponse = await fetch(videoUrl);
            const fileBuffer = await videoResponse.buffer();

            conn.sendFile(m.chat, fileBuffer, fileName, "", m);

            m.reply('Video descargado correctamente.');
        } else {
            throw `
> Sin respuesta

No se pudo obtener el contenido de TikTok.`;
        }
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta

Ocurrió un error al descargar el video de TikTok: ${error.message}`;
    }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['tiktok', 'tt'];

export default handler;
