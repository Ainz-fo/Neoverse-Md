const arenes = [
    { nom: 'Arène du désert', image: 'https://example.com/desert.jpg' },
    { nom: 'Arène de la forêt', image: 'https://example.com/foret.jpg' },
    { nom: 'Arène de la montagne', image: 'https://example.com/montagne.jpg' },
    { nom: 'Arène sous-marine', image: 'https://example.com/sous_marine.jpg' },
    { nom: 'Arène du désert', image: 'https://example.com/desert.jpg' },
    { nom: 'Arène de la forêt', image: 'https://example.com/foret.jpg' },
    { nom: 'Arène de la montagne', image: 'https://example.com/montagne.jpg' },
    { nom: 'Arène sous-marine', image: 'https://example.com/sous_marine.jpg' },
    { nom: 'Arène du désert', image: 'https://example.com/desert.jpg' },
    { nom: 'Arène de la forêt', image: 'https://example.com/foret.jpg' },
    { nom: 'Arène de la montagne', image: 'https://example.com/montagne.jpg' },
    { nom: 'Arène sous-marine', image: 'https://example.com/sous_marine.jpg' },
];

// Fonction pour tirer une arène aléatoire
function tirerArène() {
    const arèneAleatoire = arenes[Math.floor(Math.random() * arenes.length)];
    return arèneAleatoire;
}

const { zokou } = require('../framework/zokou');
const duels = new Map();  // Stocke les duels en cours

zokou(
    {
        nomCom: 'duel',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg } = commandeOptions;

        // Joindre tous les arguments en une chaîne
        const input = arg.join(' ');

        // Découper la chaîne en deux parties : avant 'vs' et après '/'
        const [joueursInput, statsCustom] = input.split('/').map(part => part.trim());

        // Découper la partie des joueurs en deux, avant et après 'vs'
        const [joueursAvantVs, joueursApresVs] = joueursInput.split('vs').map(part => part.trim());

        // Liste des joueurs de l'équipe 1 (avant le 'vs') et de l'équipe 2 (après le 'vs')
        const equipe1 = joueursAvantVs.split(',').map(joueur => joueur.trim());
        const equipe2 = joueursApresVs.split(',').map(joueur => joueur.trim());

        // Tirer une arène aléatoire
        const arèneTirée = tirerArène();

        // Générer la fiche de duel
        let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*\n░░░░░░░░░░░░░░░░░░░\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;

        // Ajouter les joueurs de l'équipe 1 avec leurs statistiques
        equipe1.forEach((joueur, index) => {
            ficheDuel += `🔷   *${joueur}*: 🫀:100% 🌀:100% ❤️:100%\n`;
        });

        ficheDuel += `                                   ~  *🆚*  ~\n`;

        // Ajouter les joueurs de l'équipe 2 avec leurs statistiques
        equipe2.forEach((joueur, index) => {
            ficheDuel += `🔷   *${joueur}*: 🫀:100% 🌀:100% ❤️:100%\n`;
        });

        // Ajouter les infos sur l'arène tirée
        ficheDuel += `
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${arèneTirée.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours! 

`;

        // Ajouter le texte des stats personnalisées, si fourni
        if (statsCustom) {
            ficheDuel += `*⚖️𝐒𝐭𝐚𝐭𝐬*: ${statsCustom}\n`;
        }

        ficheDuel += `
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: 300m max
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*
`;

        // Envoyer l'image avec le texte de la fiche de duel
        await zk.sendButtonImage(dest, arèneTirée.image, ficheDuel, 'Arena Battle');
    }
);
