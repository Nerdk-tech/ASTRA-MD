cmd({
  pattern: "listmenu",
  alias: ["commandlist", "help"],
  desc: "Fetch and display all available bot commands",
  category: "system",
  filename: __filename,
}, async (Void, m, { text }) => { 
  try {
    const commandDir = path.join(__dirname, '../plugins');
    const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

    let totalCommands = 0;
    let commandList = [];

    for (const file of commandFiles) {
      const filePath = path.join(commandDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.match(/pattern\s*:\s*["'`](.*?)["'`]/g);
      
      if (matches) {
        const extracted = matches.map(x => x.split(':')[1].replace(/["'`,]/g, '').trim());
        totalCommands += extracted.length;
        commandList.push(`📁 *${file}*\n${extracted.map(cmd => `╰➤ \`${cmd}\``).join('\n')}`);
      }
    }

    if (totalCommands === 0) {
      return m.reply("❌ No commands found in plugins.");
    }

    const time = moment().tz('Africa/Nairobi').format('HH:mm:ss');
    const date = moment().tz('Africa/Nairobi').format('dddd, MMMM Do YYYY');

    const caption = `╭━━〔 *ASTRA-MD Command List* 〕━━⬣
┃ 👑 *Total Commands:* ${totalCommands}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
╰━━━━━━━━━━━━━━━━━━━━⬣\n\n${commandList.join('\n\n')}`;

    await Void.sendMessage(m.chat, { image: { url: "https://files.catbox.moe/qdkoz3.png" }, caption });

  } catch (err) {
    console.error(err);
    await m.reply('❌ Error: Could not fetch the command list.');
  }
});
