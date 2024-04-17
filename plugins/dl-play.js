import fetch from 'node-fetch';
let data;
let buff;
let mimeType;
let fileName;
let apiUrl;
let enviando = false;
const handler = async (m, { command, usedPrefix, conn, text }) => {
  if (!text) throw `*[❗] Nombre de la canción/video faltante, por favor ingrese el comando más el nombre, título o link de alguna canción o video de YouTube.*\n\n*—◉ Ejemplo 1:*\n*${usedPrefix + command}* Good Feeling - Flo Rida\n*—◉ Ejemplo 2:*\n*${usedPrefix + command}* https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p`;
if (enviando) return;
    enviando = true
  try {
    const apiUrls = [
      `https://api.cafirexos.com/api/ytplay?text=${text}`,
      `https://api-brunosobrino.onrender.com/api/ytplay?text=${text}`
    ];

    for (const url of apiUrls) {
      try {
        const res = await fetch(url);
        data = await res.json();
        if (data.resultado && data.resultado.url) {
          break;
        }
      } catch {}
    }

    if (!data.resultado || !data.resultado.url) {
      enviando = false;
      throw `*[❗] No se pudo obtener la URL del video/canción.*`;
    } else {
      try {
        if (command === 'play.1') {
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp3?url=${data.resultado.url}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);
            } else if (command === 'play.2') {
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp4?url=${data.resultado.url}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);
        }
      } catch {
          try {
            if (command === 'play.1') {
              apiUrl = `https://api.cafirexos.com/api/v2/ytmp3?url=${data.resultado.url}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);
            } else if (command === 'play.2') {
              apiUrl = `https://api.cafirexos.com/api/v2/ytmp4?url=${data.resultado.url}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);
            }
          } catch {
            enviando = false;
            throw `*[❗] Error al descargar el video/canción desde las APIs disponibles.`;
          }
       }
    }

    const dataMessage = `*=> Título:* ${data.resultado.title}\n*=> Canal:* ${data.resultado.channel}\n*=> URL:* ${data.resultado.url}\n*=> Publicado:* ${data.resultado.publicDate}`;
    await conn.sendMessage(m.chat, { text: dataMessage }, { quoted: m });

    if (buff) {
      await conn.sendMessage(m.chat, {[mimeType.startsWith('audio') ? 'audio' : 'video']: buff.data, mimetype: mimeType, fileName: fileName}, {quoted: m});
      enviando = false;
    } else {
      enviando = false;
      throw `*[❗] Error al descargar el video/canción desde las APIs disponibles.`;
    }
  } catch (error) {
    enviando = false;
    throw `*[❗] Error: ${error.message || 'Ocurrió un error inesperado'}.*`;
  }
};
handler.help = ['play.1', 'play.2'].map((v) => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];
export default handler;
