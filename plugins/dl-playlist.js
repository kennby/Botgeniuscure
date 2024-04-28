import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search'

// Manejador para buscar videos de YouTube y obtener enlaces de descarga
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

    // Verifica si el usuario proporcionó un término de búsqueda
    if (!text) throw `✳️ ${mssg.example} *${usedPrefix + command}* Lil Peep hate my life`

    // Reacciona al mensaje con un emoji de disco
    m.react('📀')

    // Realiza la búsqueda en YouTube
    let result = await yts(text)
    let ytres = result.videos
    let listSections = []

    // Mapea los resultados de la búsqueda y los agrega a la lista de secciones
    Object.values(ytres).map((v, index) => {
        listSections.push([`${index}┃ ${v.title}`, [
            ['🎶 MP3', `${usedPrefix}fgmp3 ${v.url}`, `▢ ⌚ *${mssg.duration}:* ${v.timestamp}\n▢ 👀 *${mssg.views}:* ${v.views}\n▢ 📌 *${mssg.title}* : ${v.title}\n▢ 📆 *${mssg.aploud}:* ${v.ago}\n`],
            ['🎥 MP4', `${usedPrefix}fgmp4 ${v.url}`, `▢ ⌚ *${mssg.duration}:* ${v.timestamp}\n▢ 👀 *${mssg.views}:* ${v.views}\n▢ 📌 *${mssg.title}* : ${v.title}\n▢ 📆 *${mssg.aploud}:* ${v.ago}\n`],
            ['📋 Copiar Título', `${v.title}`, '']
        ]])
    })

    // Envía la lista de resultados al chat
    return conn.sendList(m.chat, '  ≡ *FG MUSIC*🔎', `\n 📀 Resultados de:\n *${text}*`, mssg.ig, `Click Aqui`, listSections, m)
}

// Información sobre cómo usar el comando
handler.help = ['play2']

// Etiquetas relacionadas con el comando
handler.tags = ['dl']

// Comandos relacionados con este manejador
handler.command = ['play2', 'playvid2', 'playlist', 'playlista']

// Indica si este comando está desactivado
handler.disabled = true

// Exporta el manejador para ser utilizado por otros archivos
export default handler
