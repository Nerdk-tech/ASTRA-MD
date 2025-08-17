const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "support",
  alias: ["supportgroup", "help", "channel"],
  desc: "Get PK-XMD support, channel & developer contact",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {

  const jtime = moment.tz('Africa/Nairobi').format("HH:mm:ss");
  const jdate = moment.tz('Africa/Nairobi').format("DD/MM/YY");

  // 🧾 Fake Verified Contact
  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PKDRILLER | PK-XMD",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER | PK-XMD\nORG:PKDRILLER;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const contextInfo = {
    externalAdReply: {
      title: "📞 PK-XMD • Support & Channel",
      body: `🕒 ${jtime} | 📅 ${jdate}`,
      thumbnailUrl: 'https://files.catbox.moe/cn1fia.jpg',
      sourceUrl: 'https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x',
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    },
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "PK-XMD Official"
    }
  };

  const supportText = `*🛠️ PK-XMD Support Center*\n\n╭─❍ *Support Links*\n│👥 Group: https://chat.whatsapp.com/CbY7YiuobJ1AlMJ8PviKpm?\n│📡 Channel: https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x\n│📞 Dev: wa.me/254794146821 (PKDRILLER)\n╰───────────────╮\n\n📌 Feel free to ask for help, request features or report bugs.\n\n⏰ *Time:* ${jtime}\n📅 *Date:* ${jdate}\n\n*Powered by Pkdriller*`;

  await Void.sendMessage(m.chat, {
    text: supportText,
    contextInfo
  }, { quoted: fakeContact });
});
