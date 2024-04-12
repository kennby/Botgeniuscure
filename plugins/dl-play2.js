import fetch from 'node-fetch';

let handler = async (m, { command, conn, text }) => {
    if (!text) throw `[❗INFO❗] NOMBRE DE LA CANCION FALTANTE, POR FAVOR INGRESE EL COMANDO MAS EL NOMBRE/TITULO O ENLACE DE ALGUNA CANCION O VIDEO DE YOUTUBE\n\n*—◉ EJEMPLO:\n#play.1 Good Feeling - Flo Rida*`;

    try {
        let apikey = 'gatadios'; // Reemplaza 'TU_API_KEY_AQUI' con tu API key
        let res = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=${apikey}&query=${encodeURIComponent(text)}`);
        let json = await res.json();

        if (json.status == 200 && json.message == "success") {
            let url = command == 'play.1' ? json.result.audio : json.result.video;
            let mimetype = command == 'play.1' ? 'audio/mp4' : 'video/mp4';

            if (url) {
                conn.reply(m.chat, `*_⏳ SE ESTÁ PROCESANDO SU AUDIO/VIDEO...⏳_*`, m);
                conn.sendFile(m.chat, url, 'media', '', m, false, { mimetype });
            } else {
                throw '[❗INFO❗] ERROR: URL del archivo no encontrada en la respuesta de la API';
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

