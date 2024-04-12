import fetch from 'node-fetch';

let handler = async (m, { command, conn, text }) => {
    if (!text) throw `[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO O ENLACE DE ALGUNA CANCION O VIDEO DE YOUTUBE\n\n*—◉ EJEMPLO:\n#play.1 Good Feeling - Flo Rida*`;

    try {
        let apikey = 'GATADIOS'; // Reemplaza 'TU_API_KEY_AQUI' con tu API key
        let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${apikey}&query=${encodeURIComponent(text)}`);
        let json = await res.json();

        if (json.status == 200 && json.message == "success") {
            if (command == 'play.1') {
                conn.reply(m.chat, `*_⏳ SE ESTÁ PROCESANDO SU AUDIO...⏳_*`, m);
                conn.sendFile(m.chat, json.result.audio, 'error.mp3', null, m, false, { mimetype: 'audio/mp4' });
            }

            if (command == 'play.2') {
                conn.reply(m.chat, `*_⏳ SE ESTÁ PROCESANDO SU VIDEO...⏳_*`, m);
                conn.sendFile(m.chat, json.result.dlmp4, 'error.mp4', null, m);
            }
        } else {
            throw `[❗INFO❗] ERROR: ${json.message}`;
        }
    } catch (e) {
        console.error(e);
        m.reply('*[❗INFO❗] ERROR, POR FAVOR VUELVA A INTENTARLO*');
    }
}

handler.help = ['play.1 <texto>', 'play.2 <texto>'];
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];

export default handler;
