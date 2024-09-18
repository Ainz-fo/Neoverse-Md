const { zokou } = require('../framework/zokou');

zokou(
    {
        nomCom: 'menuneo',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/CwZz0KK/image.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);

zokou(
    {
        nomCom: 'seasonpass',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/cg9Gb6h/image.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);

    zokou(
    {
        nomCom: 'recompenses',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/74xq1jX/image.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);

zokou(
    {
        nomCom: 'tournois',   
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0) {
            const lien = 'https://i.ibb.co/8mD5h4v/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'awards',   
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0) {
            const lien = 'https://i.ibb.co/CWfLcr4/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'saison',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (arg[0] === 'UF🥅')  {
            const lien = 'https://telegra.ph/file/2c25e13956f7d292b8a0f.jpg';
            const msg = `*𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂𝗲 𝗱𝗮𝗻𝘀 𝗹𝗮 𝘀𝗮𝗶𝘀𝗼𝗻 𝗨𝗙🥅*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Lors de la saison UF, les équipes sont séparées en deux ligues...la Divisions Stars et la division Novices, nous viserons 3 ligues si y'a plus de joueurs. Les 6 premiers de la division ONE vont se qualifier pour la ligue des champions et les 2 premiers de la Division SECOND aussi. 

*𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 𝗠𝗔𝗧𝗖𝗛𝗦🥅*
⚽Pour 5 matchs:  5.000.000 €
⚽Pour 5 victoires: 25.000.000 € + 10 UFC🪙
⚽Pour 10 matchs: 10.000.000 € + 5 UFC🪙
⚽Pour 10 victoires: 50.000.000 € + 50 UFC🪙

*𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 𝗳𝗶𝗻 𝗱𝗲 𝗦𝗮𝗶𝘀𝗼𝗻🥅🎁*
🎖️Top 1: +100M € + 70 UFC🪙+100🔷+50🎟️
🥈 Top 3: 50M € + 30 UFC🪙+50🔷+20🎟️
🥉 Top 6: 20M € + 10 UFC🪙+20🔷+10🎟️
🏆UEFA: 100M € + 90 UFC🪙+100🔷+50🎟️

*⚠️Récompenses avec minimum 5 matchs*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                     *UF🥅🔝*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        } else if (arg[0] === 'NBA🏀'); {
            const lien = 'https://telegra.ph/file/c70106c58248322fac390.jpg';
            const msg = `*𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂𝗲 𝗱𝗮𝗻𝘀 𝗹𝗮 𝘀𝗮𝗶𝘀𝗼𝗻 NBA🏀*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Lors de la saison NBA, les équipes sont séparées en deux Conférences...la conférence WEST🔴 et la conférence EAST🔵 . Les 8 premiers de chaques conferences joueront les PLAYOFFS mais dans un debut nous allons faire un championnat combiné 🔴WEST/EAST🔵 et les 8 premiers seront aux playoffs les. 

🏀Pour 5 matchs:  5.000.000 $
🏀Pour 5 victoires: 25.000.000 $ + 10 NBC⭕
🏀Pour 10 matchs: 10.000.000 $ + 5 NBC⭕
🏀Pour 10 victoires: 50.000.000 $ + 50 NBC⭕

*𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 𝗱𝗲 𝗦𝗮𝗶𝘀𝗼𝗻🏀🎁*
🎖️Top 1: +100M$ + 70 NBC⭕+100🔷+50🎟️
🥈 Top 3: 50M$ + 30 NBC⭕+50🔷+20🎟️
🥉 Top 6: 20M$ + 10 NBC⭕
🏆Finals: 100M$ + 90 NBC⭕+100🔷+50🎟️

*⚠️Récompenses avec minimum 5 matchs*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                     *NBA2K🏀NE⭕*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
 /*  } else (arg[0] === 'Elysium💠')  {
            const lien = 'https://telegra.ph/file/bdd957fe4f3c12dfdeb66.jpg';
            const msg = `*💠Elysium Season PASS💠*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
L'épisode D'elysium aura lieu de 19h à 22h GMT+1, les participants devront s'enregistrer à l'avance dans la journée pour participer. L'enregistrement coûte 2 NC🔷 et c'est uniquement pour les joueurs classés(ALL STARS, NBA et UF). la journée dure généralement 20 tours, les nouveaux joueurs pourront rejoindre seulement à partir de 5 tours passés avec pause de 5mins en cas de retard. 

*💠RÈGLEMENT DES LIEUX*
Les joueurs ne peuvent pas être partout à la Fois, afin d'éviter la divulgation d'informations d'activités. *⚠️donc une fois que vous voyagez vous devez quitter le groupe où vous êtes vers le nouveau Lieu que vous Pouvez Facilement Rejoindre à Travers la Communauté .* ‼️Si vous vous faites retirer de force alors 5🔷 pour revenir. 

*💠MISSIONS ET FREE PLAY*
Le but de Élysium est d'abord le free play donc Explorer un monde Gigantesque et trouver les ressources. Mais néanmoins vous pouvez aller rencontrer des PNJ qui vous proposeront des missions et quêtes *💠Lancer la mission XP* et un PNJ ne peut avoir que 2 à 3 quêtes disponibles avant de renouveler.

🥉 *Normale*: +100.000💠+10🌟 
🥈 *Difficile*: +300.000💠 +20🌟
🥇 *Extreme*: +500.000💠+30🌟

💠Vous gagnez des PC selon l'activité que vous faites +5 PC et vous gagnez des SP🌟 par rapport à vos achats et votre style de vie, après 3 tours vous perdez -20%😃 moral à moins de 20%😟 vous devenez imprécis et incapable de réussir vos actions, vous attirez même la malchance. 

⚠️Si vous êtes mort où arrêté c'est GAME OVER❌et vous perdez -10🌟 journée est terminée, vous allez seulement pouvoir revenir le prochain épisode. 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                                 *💠Processing...*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   */
        }
    });


zokou(
    {
        nomCom: 'records',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/2a2abe4cba6749fb70877.jpg';
            const msg = `. 
           ══════༺༻═══
            ⚜️\`\`\` 𝐋𝐈𝐕𝐑𝐄𝐒 𝐃'𝐇𝐈𝐒𝐓𝐎𝐈𝐑𝐄 \`\`\`⚜️
           ═════ ༺༻═══
Voici les pantheons du Nouveau monde, le livre des performances mémorables et légendaires  du nouveau monde ! ceux qui ont écrit leurs noms parmi les Astres et les plus grands à tout jamais dans le nouveau monde. 

*🔸+Champions 🏆*
*🔸+MNVP🌟*
*🔸+TOS⭐* 
*🔸+Awards 💫*
 ══════༺༻═══
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                  *🔶𝗡Ξ𝗢💫*

.`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'champions🏆',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/856864a64984161a8f1a8.jpg';
            const msg = `══════༺༻═══
                         🏆\`\`\`𝐂𝐇𝐀𝐌𝐏𝐈𝐎𝐍𝐒\`\`\`🏆
                 ══════༺༻═══
                  
Voici le panthéon des Champions du Nouveau monde✨🏆ceux qui ont un déjà rempoter un tournoi à NEOverse ! NEO TOUR EVO💠, GRAND SLAM🏆et SUPER CHAMPIONS CUP🏆(SCC) . 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🔸🔴NEO KÏNGS⚜️🇨🇬:       🏆 
🔸🔵ABA L. KÏNGS⚜️🇸🇳:   🏆
🔸🔴Lily KÏNGS⚜️🇨🇬:         🏆🏆🏆
🔸🔴Damian KÏNGS⚜️🇨🇬 : 🏆🏆🏆
🔸🔵Vanitas KÏNGS⚜️🇸🇳:  🏆
🔸🟢Adam GENESIS🇨🇮:  🏆



░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
De nouveaux Guerriers viendront chercher le titre de "CHAMPION" afin graver leurs noms à tout jamais parmi les immortels dans la légende du nouveau monde RP. Are you the NEXT KING? 👑
                    ══════༺༻═══                  
                                🔶𝗡Ξ𝗢💫`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'mnvp⭐',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/8370fd4da3413d1e629f8.jpg';
            const msg = `. 
                   ══════༺༻═══
      💫 \`\`\`𝐌𝐎𝐒𝐓 𝐍𝐄𝐎 𝐕𝐀𝐋𝐔𝐀𝐁𝐋𝐄 𝐏𝐋𝐀𝐘𝐄𝐑\`\`\` 💫
                      ═════ ༺༻═══

Livre  prestigieux de ceux qui ont inscrit leurs noms dans l'histoire en finissant *MNVP de leurs classes🎖️* , les meilleurs joueurs de la saison régulière par classe les TOP1🏆. 
🥇 *Niveau LEGENDS*: ⭐⭐⭐(Extreme) 
🥈 *Niveau ÉLITES*: ⭐⭐(Moyen) 
🥉 *Niveau NOVICES*:⭐(Facile) 

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🥇Damian KÏNGS⚜️🇨🇬: 🎖️🎖️🎖️🎖️🎖️🎖️ 
🥇Lily KÏNGS⚜️🇨🇬:         🎖️🎖️🎖️🎖️
🥈Vanitas G KÏNGS⚜️🇸🇳:  🎖️
🥈Adam GENESIS🇨🇮:  🎖️
🥈Grimm TEMPEST🇨🇲:  🎖️
🥈Vyrozz🇹🇬:  🎖️
🥈Zephyr🇨🇮: 🎖️
🥉Kemael🇨🇮:  🎖️
🥉White KÏNGS⚜️🇨🇮:  🎖️
🥉Hazlay🇸🇳: 🎖️
        

                                🔶𝗡Ξ𝗢🌟
                     ══════༺༻═══`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'tos⭐',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/bd61428816cc5e36abcad.jpg';
            const msg = `. 
                  ══════༺༻═══
                        🌟𝗧𝗢𝗦: 𝐀𝐋𝐋 𝐒𝐓𝐀𝐑𝐒🌟
                   ═════ ༺༻═══
Voici la catégorie des SUPERSTARS du nouveau monde, ceux qui ont déjà été dans la  *TOS* TEAM OF THE SEASON⭐,la team prestige 🎖️,equivalent aux TOTY⭐. 
*⚠️Notez que vous pouvez prendre votre retraite de NEOverse avec les Honneurs donc une décoration ! Mais si vous quittez en fantôme où entacher votre image vis à vis de la ligue vous perdez votre nom dans le Panthéon d'honneur.* 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*⭐Damian  KÏNGS⚜️🇨🇬*:    7⭐
*⭐Lily KÏNGS⚜️🇨🇬*:             6⭐
*⭐White KÏNGS⚜️🇨🇮*:         3⭐ 
*⭐Vanitas Gold KÏNGS⚜️🇸🇳*: 2⭐
*⭐Aether GENESIS🇬🇦*:         2⭐ 
*⭐Adam GENESIS🇨🇮*:         2⭐ 
*⭐Goldy Shogun🇹🇬*:            2⭐ 
*⭐Atsushi KÏNGS⚜️🇨🇲*:     2⭐
*⭐Kemael🇨🇮*:                        2⭐
*⭐Zephyr🇨🇮*:                          2⭐ 
*⭐Hajime NEXUS🇨🇲*:           1⭐
*⭐Grimm Tempest🇨🇲*:        1⭐ 
*⭐SoloMoe A. KÏNGS⚜️🇸🇳*: 1⭐
*⭐Thanatos Gold KÏNGS⚜️🇧🇫*:  1⭐ 
*⭐The LOA KÏNGS⚜️🇹🇬*:    1⭐
*⭐Adorieru KAMADO🇷🇴*:    1⭐
*⭐Kanzen Gold KING🇨🇮*:    1⭐
*⭐Serena Gold WHITE🇨🇮*:  1⭐

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                   🔶𝗡Ξ𝗢☀️`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

/*zokou(
    {
        nomCom: 'awards💫',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/7d380c5771ac6388f5879.jpg';
            const msg = `. 
                   ══════༺༻═══
                      💫 ''' 𝐆𝐎𝐋𝐃𝐄𝐍 𝐀𝐖𝐀𝐑𝐃𝐒 ''' 💫
                      ═════ ༺༻═══
Voici les gagnants des prestigieux prix Awards et Récompenses aux GOLDEN AWARDS du Nouveau monde RP💫.Venez écrire votre nom dans le panthéon ultime du nouveau monde. 
*⚠️Notez que vous pouvez prendre votre retraite de NEOverse avec les Honneurs donc une décoration ! Mais si vous quittez en fantôme où entacher votre image vis à vis de la ligue vous perdez votre nom dans le Panthéon d'honneur.* 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
💫 *The BEST🏆*
🔸Lily KÏNGS⚜️🇨🇬:                  2🏆
🔸Damian KÏNGS⚜️🇨🇬:          3🏆

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
💫 *The SIGMA🗿*
🔸Lily KÏNGS⚜️🇨🇬:                  1🗿
🔸Damian KÏNGS⚜️🇨🇬:          1🗿

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

💫 *NEO TROPHY🎗️*
🔸Lily KÏNGS⚜️🇨🇬:                   3🎗️
🔸Damian KÏNGS⚜️🇨🇬:           2🎗️ 
🔸White KÏNGS⚜️🇨🇮:              1🎗️ 
🔸Lord  KÏNGS⚜️🇹🇬:               1🎗️ 



        

                 🔶𝗡Ξ𝗢💫GOLDEN AWARDS
                     ══════༺༻═══`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);
*/
zokou(
    {
        nomCom: 'calendar',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/GWvn4C5/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'rankings',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/1bj0nWf/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);


zokou(
    {
        nomCom: 'gamepass',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/xG1rDqs/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'guides',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const liena = 'https://i.ibb.co/PzKS13f/image.jpg';
            const lienb = 'https://i.ibb.co/FnR6hYj/image.jpg';
            const lienc = 'https://i.ibb.co/tZTSpTH/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: liena }, caption: msg }, { quoted: ms });
            zk.sendMessage(dest, { image: { url: lienb }, caption: msg }, { quoted: ms });
            zk.sendMessage(dest, { image: { url: lienc }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'allstars',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/XZbCqqR/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);


zokou(
    {
        nomCom: 'trade',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/qJS32Vc/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

/*zokou(
    {
        nomCom: 'extra',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (arg[0] === 'draft🔷')  {
            const lien = 'https://telegra.ph/file/bfd52371074158ab34a18.jpg';
            const msg = `🔷Afin de rendre la Draft plus équitable les Divisions ayant moins de joueurs actifs ont la priorité sur la Draft. Donc doivent impérativement Drafter et les Divisions ayant le plus de joueurs actifs allons de 4 à 5 sur une saison avec plus de 3/5 combats peuvent passer le tour où sont moins prioritaires afin que toutes les divisions aient au moins 4 joueurs actifs sûrs et au fur et à mesure des nouvelles drafts les joueurs vont se fideliser. Une division qui passe un tour est prioritaire sur la Draft du prochain tour. 

🔷Maintenant les Divisions peuvent décider de Drafter où non ! Ne pas Drafter permets aussi d'économiser de l'argent et de la place, car le quota pour une division est de 10 joueurs actifs par Divisions avant d'augmenter après avoir équilibrer entre les divisions.
*⚠️Si un joueur est viré(ce qui permettra à la Division de récupérer la moitié de la somme dépensée)d'une division pour inactivité non justifiée si il veut revenir il doit recommencer à zéro donc en Rookie et après avoir refait ses preuves une nouvelle division peut le drafter où alors il retourne dans sa division d'origine*

*🔷𝗧𝗿𝗮𝗱𝗲*(TRANSFERT🫱🏽‍🫲🏻) 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Les divisions peuvent faire des transferts de joueurs en fin de saison. Cela se fait par Échange entre deux joueurs pour 50% des frais où un transfert pour 100% de frais. La somme sera déversée à la Division qui vends le joueur.
*Joueur TOS🌟*: 1.000.000🧭 + 300.000🧭 ind
*Joueur TOP 6🏆*: 500.000🧭 + 100.000🧭 ind
*Joueur en dessous*: 100.000🧭
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                      *🔷NSL🏆🔝*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);*/

zokou(
    {
        nomCom: 'events',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://i.ibb.co/c8npsnW/image.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'pave',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
           // const lien = '';
            const msg = `.            □□□□ *🔷𝗧𝗘𝗫𝗧𝖦𝖠𝖬𝖨𝖭𝖦🎮* □□□□
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                         *`🌍Distance`:* 5m
                         
💬🎧𝗖𝗵𝗮𝘁: 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🎮 *`ACTIONS`*:
-
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                 *🔷𝗡Ξ𝗢🔝*.`;
           // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);

/*zokou(
    {
        nomCom: 'menuoptions',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
           const msg = `+menuNeo🔷
+Rankings🔷
+calendar🔷
+trade🔷
+Recompenses🎁
+SeasonPass🔷
+tournois🏆
+Events🎊
+Records🔷
+champions🏆
+MNVP⭐
+saison UF🥅
+saison NBA🏀
+Tos⭐
+Duel
+Pave`;
            repondre(msg);
        }
    }
);

zokou(
    {
        nomCom: '',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = '';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);*/

