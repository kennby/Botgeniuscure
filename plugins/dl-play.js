import fetch from 'node-fetch';


let data;
let buff;
let mimeType;
let fileName;
let apiUrl;
let enviando = false;
const handler = async (m, { command, usedPrefix, conn, text }) => {

  if (!text) throw `err`;
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
      throw `err}`;
    } else {
      try {      
        if (command === 'play.1') { // play.1 con CFROS API v1 ytmp3
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp3?url=${data.resultado.url}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);          
            } else if (command === 'play.2') { // play.2 con CFROS API v1 ytmp4
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp4?url=${data.resultado.url}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);        
        }
      } catch {        
          try {
            if (command === 'play.1') { // play.1 con CFROS API v2 ytmp3
              apiUrl = `https://api.cafirexos.com/api/v2/ytmp3?url=${data.resultado.url}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);              
            } else if (command === 'play.2') { // play.2 con CFROS API v2 ytmp4
              apiUrl = `https://api.cafirexos.com/api/v2/ytmp4?url=${data.resultado.url}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);              
            }
          } catch {
            enviando = false;
            throw `ere;
          }
       }
    }

    const dataMessage = `err`;
    await conn.sendMessage(m.chat, { text: dataMessage }, { quoted: m });

    if (buff) {
      await conn.sendMessage(m.chat, {[mimeType.startsWith('audio') ? 'audio' : 'video']: buff.data, mimetype: mimeType, fileName: fileName}, {quoted: m});
      enviando = false;
    } else {
      enviando = false;
      throw `err`;
    }
  } catch (error) {
    enviando = false;
    throw err;
  }
};
handler.command = ['play.1', 'play.2'];
export default handler;
