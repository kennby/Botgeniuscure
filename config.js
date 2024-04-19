import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['51907364682', 'kenn', true],
  ['51902247905']
] //Numeros de owner 

global.mods = [''] 
global.prems = ['51902247905', '51902247905']
global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'Rex6QGQI' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'chonx' 
global.author = 'kenn' 

//--info FG
global.botName = 'chonx'
global.fgig = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j' 
global.fgsc = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j' 
global.fgyt = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j'
global.fgpyp = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j'
global.fglog = 'https://telegra.ph/file/829c932a8e1bbf742dcc9.jpg' 

//--- Grupos WA
global.fgcanal = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j'
global.bgp = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j'
global.bgp2 = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j'
global.bgp3 = 'https://whatsapp.com/channel/0029VaOXYA76GcGCoumjn41j' //--GP NSFW

global.wait = '⌛'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
