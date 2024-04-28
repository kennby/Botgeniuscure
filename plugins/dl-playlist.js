import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search'

// Manejador para buscar videos de YouTube y obtener enlaces de descarga
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

    // Verifica si el usuario proporcionó un término de búsqueda
    if (!text) throw `usa /play Lil Peep hate my life`

    // Reacciona al mensaje con un emoji de disco
    m.react('📀')

    // Realiza la búsqueda en YouTube
    let result = await yts(text)
    let ytres = result.videos
    let listSections = []

    // Mapea los resultados de la búsqueda y los agrega a la lista de secciones
    Object.values(ytres).map((v, index) => {
        listSections.push([`${index}┃ ${v.title}`, [
            ['🎶 MP3', `${usedPrefix}mp3 ${v.url}`, `${mssg.title}\n`],
            ['🎥 MP4', `${usedPrefix}mp4 ${v.url}`, `${mssg.title}\n`]
        ]])
    })

    // Envía la lista de resultados al chat
    return conn.sendList(m.chat, 'Resultados de:\n *${text}*`, mssg.ig, `k gay`, listSections, m)
}

// Información sobre cómo usar el comando
handler.help = ['play2']

// Etiquetas relacionadas con el comando
handler.tags = ['dl']

// Comandos relacionados con este manejador
handler.command = ['play2', 'playvid2', 'playlist', 'playlista']

// Indica si este comando está desactivado
handler.disabled = false

// Exporta el manejador para ser utilizado por otros archivos
export default handler
  
