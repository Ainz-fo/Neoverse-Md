const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/westdiv');
const s = require("../set");

const dbUrl = s.DB;


zokou(
  {
    nomCom: 'westvanitas👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('1');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/7456fcd52743ec0728d47.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 1`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 1`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 1`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);


zokou(
  {
    nomCom: 'westnash👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('2');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/06b0a776277f6f4c31051.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 2`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 2`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 2`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);

// lloyd 3
zokou(
  {
    nomCom: 'westaether👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('4');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/c8848f5441885f2ee0eed.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 4`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 4`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 4`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);
//Lord16 5
zokou(
  {
    nomCom: 'westsolomoe👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('6');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/7e1f5075ef9d06ba61a7f.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 6`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 6`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 6`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);

zokou(
  {
    nomCom: 'westsept👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('7');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/9c33ed5cb7e6abbedf4be.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 7`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 7`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 7`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);

zokou(
  {
    nomCom: 'westtempest👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('8');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/ab3d637fb7828794c21df.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 8`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 8`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 8`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);

zokou(
  {
    nomCom: 'westwilliam👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('9');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/be3d0132f284a14d972c6.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 9`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 9`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 9`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);
zokou(
  {
    nomCom: 'westhajime👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('10');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/2d8f5b7c04f8cbcaea1bf.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 10`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 10`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 10`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);

zokou(
  {
    nomCom: 'westregulus👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
      const data = await getData('11');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `.                     *👤𝗜𝗡𝗙𝗢𝗦 𝗗𝗘 𝗝𝗢𝗨𝗘𝗨𝗥𝗦👤*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Points de talent XP⭐*: ${data.e10}⭐
◇ *Rang 🎖️*:${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Golds🧭*: ${data.e5} G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
◇ *Gift Box🎁*:${data.e7} 🎁

                             *🏆𝗣𝗔𝗟𝗠𝗔𝗥𝗘𝗦🏆*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🎴𝗖𝗔𝗥𝗗𝗦🎴*
▓ ▓ ▓ ▓▓▓▓▓▓ ▓▓▓ ▓ ▓
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/ffb64bf678bb1107cca18.jpg' }, caption: mesg }, { quoted: ms });
       } else {
   const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    np: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    globes: "e22", 
                    pos: "e23"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 11`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === '=' || signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM westdiv WHERE id = 11`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if(signe === '=') {
                            newValue = `${texte.join(' ')}`;
                        } else if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE westdiv SET ${update.colonneObjet} = $1 WHERE id = 11`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);
