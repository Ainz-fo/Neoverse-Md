const { zokou } = require("../framework/zokou");
const s = require("../set");


zokou(
  { nomCom: "menu", reaction: "📁", categorie: "Other" },
  async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};

    cm.map(async (com) => {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    });

    let menu_info = `╭──❏ *🄽🄴🄾_🅆🄰-🄱🄾🅃*  ❏
│ ✿ Prefix: ${s.PREFIXE}
│ ✿ Commands: ${cm.length}
│ ✿ Developer: Ainz K⚜️
╰═════════════⊷\n\n`;

    for (const cat in coms) {
      menu_info += `*╭────❏ ${cat} ❏*`;
      for (const cmd of coms[cat]) {
        menu_info += `
*│☞* ${cmd}`;
      }
      menu_info += `
*╰═════════════⊷*\n`;
    }

    menu_info += "*🔷𝚴𝚵𝚯 𝐃𝚵𝛁𝚵𝐋𝚯𝚸𝚸𝚵𝐔𝚪 🖥️*";
    const lien = ''; // Add the image URL here if needed

    await zk.sendMessage(dest, { image: { url: lien }, caption: menu_info }, { quoted: ms });
  }
);
