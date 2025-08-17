const config = require('../config')
const { cmd } = require('../command')
const os = require("os")
const { runtime, sleep } = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Show the bot's GitHub repository",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Pkphotographer1911/PK-XMD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await axios.get(`https://api.github.com/repos/Nerdk-tech/ASTRA-MD`);
        const repoData = response.data;

        const formattedInfo = `
╭─〔 *PK-XMD REPOSITORY* 〕
│
├─ *📌 Repo Name:* ${repoData.name}
├─ *👤 Owner:* ${repoData.owner.login}
├─ *⭐ Stars:* ${repoData.stargazers_count}
├─ *⑂ Forks:* ${repoData.forks_count}
├─ *📄 Description:* ${repoData.description || 'Powerful WhatsApp Multi-Device Bot by Dami}
│
├─ *🔗 GitHub Link:*
│   ${repoData.html_url}
│
├─ *🌍 Channel:*
│   https://whatsapp.com/channel/0029VazHPYwBqbr9HjXrc50m
│
╰─ *🚀 Powered by Daminī*
`.trim();

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/qdkoz3.png` }, // you can change image
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363377534493877@newsletter',
                    newsletterName: 'ASTRA-MD UPDATES',
                    serverMessageId: 110
                }
            }
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ASTRA-MD VERIFIED",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN: ASTRA-MD;BOT;;;\nFN:ASTRA-XMD\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    } catch (error) {
        console.error("❌ Error fetching repo:", error);
        reply("❌ Failed to fetch repository info. Please try again later.");
    }
});
