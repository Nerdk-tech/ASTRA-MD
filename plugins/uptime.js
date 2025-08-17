const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "uptime",
  alias: ["up"],
  desc: "Check how long the bot has been online.",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {
  const runtime = () => {
    let seconds = process.uptime();
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "DAMINĪ | ASTRA-MD",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: DAMINĪ | ASTRA-MD\nORG:PKDRILLER;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const uptimeText = `*🤖 ASTRA-MD Bot Uptime:*\n🕒 ${runtime()}\n\n💡 The bot has been running without interruption.`;

  await Void.sendMessage(m.chat, {
    text: uptimeText,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363377534493877@newsletter",
        newsletterName: "ASTRA-MD Official"
      },
      externalAdReply: {
        title: "ASTRA-MD",
        body: "Uptime Monitor by ASTRA-MD",
        thumbnailUrl: "https://files.catbox.moe/fgiecg.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://github.com/mejjar00254"
      }
    }
  }, { quoted: fakeContact });
});
