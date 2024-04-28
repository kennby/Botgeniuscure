import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `✳️ ${mssg.example} *${usedPrefix + command}* Lil Peep hate my life`

    m.react('📀')
    let result = await yts(text)
    let ytres = result.videos

    let listSections = ytres.map((v, index) => {
        return {
            title: `${index}┃ ${v.title}`,
            rows: [
                {
                    title: '🎶 MP3',
                    description: `⌚ *${mssg.duration}:* ${v.timestamp}\n👀 *${mssg.views}:* ${v.views}\n📌 *${mssg.title}* : ${v.title}\n📆 *${mssg.aploud}:* ${v.ago}`,
                    rowId: `${usedPrefix}fgmp3 ${v.url}`
                },
                {
                    title: '🎥 MP4',
                    description: `⌚ *${mssg.duration}:* ${v.timestamp}\n👀 *${mssg.views}:* ${v.views}\n📌 *${mssg.title}* : ${v.title}\n📆 *${mssg.aploud}:* ${v.ago}`,
                    rowId: `${usedPrefix}fgmp4 ${v.url}`
                }
            ]
        }
    })

    conn.sendButtonList(m.chat, '  ≡ *FG MUSIC*🔎', `\n 📀 Resultados de:\n *${text}*`, mssg.ig, listSections, true, { quoted: m })
}
handler.help = ['play2']
handler.tags = ['dl']
handler.command = ['play2', 'playvid2', 'playlist', 'playlista']
//handler.disabled = false

export default handler
