const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "listmenu",
  alias: ["commandlist", "help"],
  desc: "Fetch and display all available bot commands",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => { // removed { prefix } from params
  try {
    const commandDir = path.join(__dirname, '../plugins');
    const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

    let totalCommands = 0;
    let commandList = [];

    for (const file of commandFiles) {
      const filePath = path.join(commandDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.match(/pattern:\s*["'`](.*?)["'`]/g);
      
      if (matches) {
        const extracted = matches.map(x => x.split(':')[1].replace(/["'`,]/g, '').trim());
        totalCommands += extracted.length;
        commandList.push(`📁 *${file}*\n${extracted.map(cmd => `╰➤ \`${cmd}\``).join('\n')}`);
      }
    }

    const time = moment().tz('Africa/Nairobi').format('HH:mm:ss');
    const date = moment().tz('Africa/Nairobi').format('dddd, MMMM Do YYYY');

    const caption = `╭━━〔 *ASTRA-MD Command List* 〕━━⬣
┃ 👑 *Total Commands:* ${totalCommands}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
╰━━━━━━━━━━━━━━━━━━━━⬣\n\n${commandList.join('\n\n')}`;

    await Void.sendMessage(m.chat, {
      image: { url: "https://files.catbox.moe/qdkoz3.png" },
      caption,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363377534493877@newsletter",
          newsletterName: "ASTRA-MD Official",
          serverMessageId: 2
        },
        externalAdReply: {
          title: "ASTRA-MD Plugin List",
          body: `Powered by Daminī`,
          mediaType: 1,
          sourceUrl: "https://github.com/Nerdk-tech/ASTRA-MD",
          renderLargerThumbnail: false,
          showAdAttribution: true
        }
      }
    }, {
      quoted: {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          remoteJid: 'status@broadcast'
        },
        message: {
          contactMessage: {
            displayName: "ASTRA-MD | Powered by daminī",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:ASTRA-MD | daminī\nORG: daminī;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      }
    });

  } catch (err) {
    console.error(err);
    await m.reply('❌ Error: Could not fetch the command list.');
  }
});
