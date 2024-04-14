import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `🎌 *Ingresé una petición*\n\nEjemplo, !bard Conoces CuriosityBot-MD?`, m, fake, )

try {

conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://api.alyachan.dev/api/bard-google-ai?q=${encodeURIComponent(text)}&apikey=GataDios`)
var res = await apii.json()

if (res.status && res.data && res.data.chats) {
  await m.reply(res.data.chats)
} else {
  await m.reply('No se pudo obtener una respuesta adecuada de la API.')
}

} catch (error) {
console.error(error)
return conn.reply(m.chat, `*🚩 Ocurrió un fallo*`, m, fake, )
}

}
handler.command = ['bard']
handler.help = ['bard']
handler.tags = ['ai']

handler.premium = false

export default handler
