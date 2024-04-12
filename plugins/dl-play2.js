import yts from 'yt-search'
import ytdl from 'ytdl-core'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import fg from 'api-dylux'
import fetch from 'node-fetch'

let limit = 320

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
    if (!text) throw `✳️ ${mssg.example} *${usedPrefix + command}* Lil Peep hate my life`
    
    let chat = global.db.data.chats[m.chat]
    let res = await yts(text)
    let vid = res.videos[0]
    if (!vid) throw `✳️ Vídeo/Audio no encontrado`
    
    let isVideo = /vid$/.test(command)
    m.react('🎧') 
    
    let play = `

    ${mssg.title}:* ${vid.title}
    
    _Enviando..._`
    
    conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rcanal)
    
    let q = isVideo ? '360p' : '128kbps' 
    try {
        let yt = await (isVideo ? fg.ytv : fg.yta)(vid.url, q)
        let { title, dl_url, quality, size, sizeB } = yt
        let isLimit = limit * 1024 < sizeB 
    
        await conn.loadingMsg(m.chat, '📥 Descargando', `` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)
        
        if (!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), ``.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
        
        m.react(done) 
    } catch {
        try {
            let yt = await (isVideo ? fg.ytmp4 : ytmp3)(vid.url, q)
            let { title, dl_url, quality, size, sizeB} = yt
            let isLimit = limit * 1024 < sizeB 
    
            await conn.loadingMsg(m.chat, '📥 Descargando', ` ${isLimit ? `` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)
        
            if (!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /2$/.test(command)), ``.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
            
            m.react(done) 
        } catch (error) {
            m.reply(`❎ ${mssg.error}`)
        }
    }
}

handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']

export default handler

const streamPipeline = promisify(pipeline);

async function ytmp3(url) {
    const videoInfo = await ytdl.getInfo(url);
    const { videoDetails } = videoInfo;
    const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
    const thumbnail = thumbnails[0].url;
    
    const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const tmpDir = os.tmpdir();
    const audioFilePath = `${tmpDir}/${title}.mp3`;

    await streamPipeline(audioStream, fs.createWriteStream(audioFilePath));

    return {
        title,
        views: viewCount,
        publish: uploadDate,
        duration: lengthSeconds,
        quality: '128kbps',
        thumb: thumbnail,
        size: '0mb', 
        sizeB: '0', 
        dl_url: audioFilePath
    };
                              }

