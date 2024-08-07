const { zokou } = require('../framework/zokou');
const { cards } = require('./cards');

// Fonction pour obtenir une carte aléatoire d'une catégorie
function getRandomCard(category, grade) {
    const cardsArray = cards[category].filter(card => card.grade === grade);
    const randomIndex = Math.floor(Math.random() * cardsArray.length);
    return cardsArray[randomIndex];
}

// Fonction pour tirer une probabilité et retourner le grade correspondant
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

// Fonction pour envoyer une carte
async function envoyerCarte(dest, zk, ms, imageCategory, probabilities) {
    const grade = tirerProbabilite(probabilities);
    const card = getRandomCard(imageCategory, grade);
    
    if (card) {
        await zk.sendMessage(dest, { 
            image: { url: card.image }, 
            caption: `Grade: ${card.grade}\nName: ${card.name}\nPrice: $${card.price}` 
        }, { quoted: ms });
    } else {
        throw new Error("Aucune carte disponible dans cette catégorie.");
    }
}

zokou(
  { 
    nomCom: "tirage", 
    reaction: "🎰", 
    categorie: "NEOverse" 
  }, 
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
    const niveau = arg[0];
    
    try {
      let imageCategory = niveau;
      let probabilities = [];

      // Définir les probabilités en fonction du niveau
      switch (niveau) {
        case "sparking":
          probabilities = [
            { grade: "A", probability: 10 },
            { grade: "B", probability: 40 },
            { grade: "C", probability: 50 }
          ]; 
          break;
        case "ultra":
          probabilities = [
            { grade: "A", probability: 20 },
            { grade: "B", probability: 30 },
            { grade: "C", probability: 50 }
          ]; 
          break;
        case "legends":
          probabilities = [
            { grade: "A", probability: 30 },
            { grade: "B", probability: 20 },
            { grade: "C", probability: 50 }
          ]; 
          break;
        default:
          repondre("Niveau de tirage inconnu.");
          return;
      }

      // Envoyer deux cartes
      await envoyerCarte(dest, zk, ms, imageCategory, probabilities);
      await envoyerCarte(dest, zk, ms, imageCategory, probabilities);

    } catch (error) {
      repondre("Une erreur est survenue pendant le tirage : " + error.message);
    }
  }
);
