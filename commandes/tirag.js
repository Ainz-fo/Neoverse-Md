const { zokou } = require('../framework/zokou');
const { cards } = require('./cards');

function tirerProbabilite(probabilities) {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i].probability;
        if (random < cumulativeProbability) {
            return probabilities[i].grade;
        }
    }
    return probabilities[probabilities.length - 1].grade;
}

function tirerCategorie(probabilities) {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i].probability;
        if (random < cumulativeProbability) {
            return probabilities[i].subCategory;
        }
    }
    return probabilities[probabilities.length - 1].subCategory;
}

async function envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities, cartesTirees) {
    let card;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const grade = tirerProbabilite(gradeProbabilities);
        const Category = tirerCategorie(subCategoryProbabilities);
        card = findCardWithRandomGrade(imageCategory, grade, Category, cartesTirees);

        if (card && !cartesTirees.includes(card.name)) {
            cartesTirees.push(card.name);
            try {
                await zk.sendMessage(dest, { 
                    image: { url: card.image }, 
                    caption: `Grade: ${card.grade}\nCategory: ${card.category}\nName: ${card.name}\nPrix: ${card.price}` 
                }, { quoted: ms });
                return;
            } catch (error) {
                throw new Error(`Erreur lors de l'envoi de la carte : ${error.message}`);
            }
        }

        attempts++;
    }

    throw new Error("Aucune carte disponible dans cette catégorie et grade, même après fallback.");
}

async function envoyerVideo(dest, zk, videoUrl) {
    try {
        await zk.sendMessage(dest, { video: { url: videoUrl }, gifPlayback: true });
    } catch (error) {
        throw new Error(`Erreur lors de l'envoi de la vidéo : ${error.message}`);
    }
}

zokou(
  { 
    nomCom: "tirage", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  }, 
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms, auteurMessage, origineMessage } = commandeOptions;
    try {
        if (['120363049564083813@g.us', '120363307444088356@g.us', '22651463203@s.whatsapp.net', '22605463559@s.whatsapp.net'].includes(origineMessage)) {
            await zk.sendMessage(dest, { 
                image: { url: './video_file/Tirage_choice.jpg' }, 
                caption: ''
            }, { quoted: ms });

            const getConfirmation = async (attempt = 1, maxAttempts = 3) => {
                if (attempt > maxAttempts) {
                    throw new Error('MaxAttemptsReached');
                }

                try {
                    const rep = await zk.awaitForMessage({
                        sender: auteurMessage,
                        chatJid: origineMessage,
                        timeout: 60000
                    });

                    let response = rep.message?.extendedTextMessage?.text || rep.message?.conversation || '';
                    response = response.toLowerCase();
                    
                    if (['legends', 'ultra', 'sparking'].includes(response)) {
                        return response;
                    } else {
                        await repondre('Veuillez choisir l\'une des options proposées (legends, ultra, sparking).');
                        return await getConfirmation(attempt + 1, maxAttempts);
                    }
                } catch (error) {
                    if (error.message === 'Timeout') {
                        throw new Error('Timeout');
                    } else {
                        throw error;
                    }
                }
            };

            let niveau;
            try {
                niveau = await getConfirmation();
            } catch (error) {
                if (error.message === 'Timeout') {
                    return repondre('*❌ Délai d\'attente expiré*');
                } else if (error.message === 'MaxAttemptsReached') {
                    return repondre('*❌ Nombre maximal de tentatives dépassé*');
                } else {
                    throw error;
                }
            }

            const config = {
    sparking: {
        videoUrl: "./video_file/sparking.mp4",
        gradeProbabilities: [
            { grade: "or", probability: 10 },
            { grade: "argent", probability: 30 },
            { grade: "bronze", probability: 60 }
        ],
        subCategoryProbabilities: [
            { subCategory: "s-", probability: 40 },
            { subCategory: "s", probability: 30 },
            { subCategory: "s+", probability: 20 },
            { subCategory: "ss-", probability: 5 },
            { subCategory: "ss", probability: 3 },
            { subCategory: "ss+", probability: 2 }
        ]
    },
    ultra: {
        videoUrl: "./video_file/ultra.mp4",
        gradeProbabilities: [
            { grade: "or", probability: 15 },
            { grade: "argent", probability: 35 },
            { grade: "bronze", probability: 50 }
        ],
        subCategoryProbabilities: [
            { subCategory: "s-", probability: 35 },
            { subCategory: "s", probability: 25 },
            { subCategory: "s+", probability: 18 },
            { subCategory: "ss-", probability: 12 },
            { subCategory: "ss", probability: 7 },
            { subCategory: "ss+", probability: 3 }
        ]
    },
    legends: {
        videoUrl: "./video_file/legend.mp4",
        gradeProbabilities: [
            { grade: "or", probability: 20 },
            { grade: "argent", probability: 40 },
            { grade: "bronze", probability: 40 }
        ],
        subCategoryProbabilities: [
            { subCategory: "s-", probability: 30 },
            { subCategory: "s", probability: 25 },
            { subCategory: "s+", probability: 20 },
            { subCategory: "ss-", probability: 12 },
            { subCategory: "ss", probability: 8 },
            { subCategory: "ss+", probability: 5 }
        ]
    }
};

            const selectedConfig = config[niveau];
            await envoyerVideo(dest, zk, selectedConfig.videoUrl);

            const cartesTirees = [];
            const tirages = 2;  // Tirer 2 cartes quel que soit le niveau

            for (let i = 0; i < tirages; i++) {
                try {
                    await envoyerCarte(dest, zk, ms, niveau, selectedConfig.gradeProbabilities, selectedConfig.subCategoryProbabilities, cartesTirees);
                } catch (error) {
                    await repondre(error.message);
                }
            }
        } else {
            return await repondre('*❌ Vous ne pouvez pas lancer cette commande ici*');
        }
    } catch (error) {
        return repondre(`Erreur lors de l'envoi des cartes : ${error.message}`);
    }
  }
);
