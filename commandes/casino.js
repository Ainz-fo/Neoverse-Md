const { zokou } = require('../framework/zokou');

const generateRandomNumbers = (min, max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
};

const generateRewards = () => {
  const rewards = ['10🔷', '50.000 G🧭', '10🎟'];
  return rewards.sort(() => 0.5 - Math.random()).slice(0, 3);
};

// Suivi des parties en cours pour chaque joueur
const ongoingGames = {};

zokou(
  {
    nomCom: 'roulette',
    reaction: '🎰',
    categorie: 'NEO_GAMES🎰'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage, auteurMsgRepondu, msgRepondu, arg } = commandeOptions;
    try {
      // Annuler une partie en cours pour le joueur s'il en lance une nouvelle
      if (origineMessage === '120363024647909493@g.us' || origineMessage === '120363307444088356@g.us') {
      if (ongoingGames[auteurMessage]) {
        await zk.sendMessage(origineMessage, { text: 'Votre précédente partie a été annulée.' });
        delete ongoingGames[auteurMessage];
      }

      // Démarrer une nouvelle partie
      ongoingGames[auteurMessage] = { status: 'started' };

      let numbers = generateRandomNumbers(0, 50, 50);
      let winningNumbers = generateRandomNumbers(0, 50, 3);
      let rewards = generateRewards();
      let liena = 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
      let msga = `*🎰𝗧𝗘𝗡𝗧𝗘𝗭 𝗩𝗢𝗧𝗥𝗘 𝗖𝗛𝗔𝗡𝗖𝗘🥳 !!*
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬🎉🎉🎉
jouez à la roulette des chiffres et obtenez une récompense pour le bon numéro que vous choisissez parmi les *5️⃣0️⃣*. *⚠️vous avez 2 tentatives et pour jouer vous devez payer 2🔶*
▔▔🎊▔🎊▔🎊▔▔🎊▔▔🎊▔🎊▔🎊
*\`${numbers.join(', ')}\`*
▔▔🎊▔🎊▔🎊▔▔🎊▔▔🎊▔🎊▔🎊
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬🎉🎉🎉
*\`+Cadeaux\`* (🎁Pour voir les Récompenses possibles) 

*🎊Voulez vous tenter votre chance ?* (1min) 
✅: \`Oui\`
❌: \`Non\``

      await zk.sendMessage(origineMessage, { image: { url: liena }, caption: msga }, { quoted: ms });

      const getConfirmation = async () => {
        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let response;
        try {
          response = rep.message.extendedTextMessage.text;
        } catch {
          response = rep.message.conversation;
        }

        if (response.toLowerCase() === 'oui') {
          return true;
        } else if (response.toLowerCase() === 'non') {
          return false;
        } else {
          await repondre('Veuillez répondre par Oui ou Non.');
          return await getConfirmation();
        }
      };

      if (!(await getConfirmation())) {
        delete ongoingGames[auteurMessage];
        return repondre('*\`❌Délai d\'attente expiré\`*');
      }

      const getChosenNumber = async () => {
        let msgb = '🎊😃: *Choisissez un numéro vous avez 1min⚠️*(Répondre à ce message)';
        let lienb = 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
        await zk.sendMessage(origineMessage, { image: { url: lienb }, caption: msgb }, { quoted: ms });

        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let chosenNumber;
        try {
          chosenNumber = rep.message.extendedTextMessage.text;
        } catch {
          chosenNumber = rep.message.conversation;
        }

        chosenNumber = parseInt(chosenNumber);

        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 50) {
          await repondre('Veuillez choisir un des numéros proposés.');
          return await getChosenNumber();
        }

        return chosenNumber;
      };

      const getChosenNumberchance = async () => {
        //let msgb = '🎊😃: *Choisissez un numéro vous avez 1min⚠️*(Répondre à ce message)';
       // let lienb = 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
       // await zk.sendMessage(origineMessage, { image: { url: lienb }, caption: msgb }, { quoted: ms });

        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let chosenNumber;
        try {
          chosenNumber = rep.message.extendedTextMessage.text;
        } catch {
          chosenNumber = rep.message.conversation;
        }

        chosenNumber = parseInt(chosenNumber);

        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 50) {
          await repondre('Veuillez choisir un des numéros proposés.');
          return await getChosenNumber();
        }

        return chosenNumber;
      };

      let chosenNumber = await getChosenNumber();

      const checkWinningNumber = (number) => {
        if (winningNumbers.includes(number)) {
          let rewardIndex = winningNumbers.indexOf(number);
          let reward = rewards[rewardIndex];
          let msgc = `🎊🥳😍 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬*✅EXCELLENT! C'était le bon numéro ${reward}! Vas-y tu peux encore gagner plus ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬😍🥳🎊`;
          let lienc = 'https://telegra.ph/file/dc157f349cd8045dff559.jpg'
          return zk.sendMessage(origineMessage, { image: { url: lienc }, caption: msgc }, { quoted: ms });
          
        } else {
          let msgd = `😫😖💔 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬❌NON ! C'était le mauvais numéro ! Dommage tu y étais presque💔▭▬▭▬▭▬▭▬▭▬▭▬▭▬😫😖💔`;
          let liend = 'https://telegra.ph/file/222cefbcd18ba50012d05.jpg'
          return zk.sendMessage(origineMessage, { image: { url: liend }, caption: msgd }, { quoted: ms });
          
        }
      };

      const checkWinningNumberfirstchance = (number) => {
        if (winningNumbers.includes(number)) {
          let rewardIndex = winningNumbers.indexOf(number);
          let reward = rewards[rewardIndex];
          let msgc = `🎊🥳😍 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬*✅EXCELLENT! C'était le bon numéro ${reward}! Vas-y tu peux encore gagner plus ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬😍🥳🎊`;
          let lienc = 'https://telegra.ph/file/dc157f349cd8045dff559.jpg'
          return zk.sendMessage(origineMessage, { image: { url: lienc }, caption: msgc }, { quoted: ms });
          
        } 
      };
      let messageResult = checkWinningNumberfirstchance(chosenNumber);

      if (!winningNumbers.includes(chosenNumber)) {
        delete ongoingGames[auteurMessage];
        let liend = 'https://i.ibb.co/SPY5b86/image.jpg';
        let msgd = 'Vous avez une deuxième chance ! Choisissez un autre numéro.';
        await zk.sendMessage(origineMessage, { image: { url: liend }, caption: msgd }, { quoted: ms });
        chosenNumber = await getChosenNumberchance();
        messageResult = checkWinningNumber(chosenNumber);
      }

      await repondre(messageResult);
      delete ongoingGames[auteurMessage]; // Fin de la partie
      } } catch (error) {
      console.error("Erreur lors du jeu de roulette:", error);
      //repondre('Une erreur est survenue. Veuillez réessayer.');
    }
  }
);

zokou(
  {
    nomCom: 'cadeaux',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    if (origineMessage === '120363024647909493@g.us' || origineMessage === '120363307444088356@g.us') {   
      let lien = 'https://i.ibb.co/K6yZgTt/image.jpg';
      let msg = '';
      
      // Envoyer l'image en vue unique
      zk.sendMessage(origineMessage, { 
        image: { url: lien }, 
        caption: msg, 
       // viewOnce: true 
      }, { quoted: ms });
    }
  }
);

zokou(
  {
    nomCom: 'cad',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    //if (origineMessage === '120363024647909493@g.us' || origineMessage === '120363307444088356@g.us') {   
      let lien = './Card_data/Dagon_bronze_sparking_s_300k.jpg';
      let msg = '';
      
      // Envoyer l'image en vue unique
      zk.sendMessage(origineMessage, { 
        image: { url: lien }, 
        caption: msg, 
       // viewOnce: true 
      }, { quoted: ms });
   // }
  }
);
/*zokou(
  {
    nomCom: 'cadeaux',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
   // if (origineMessage === '120363024647909493@g.us' || origineMessage === '120363307444088356@g.us') {   
      let lien = 'https://i.ibb.co/K6yZgTt/image.jpg';
      let msg = 'Sélectionnez un cadeau ci-dessous 🎁';

      // Liste de boutons pour les cadeaux
      let buttons = [
        { buttonId: '+cadeau', buttonText: { displayText: 'Cadeau 1' }, type: 1 },
        { buttonId: 'cadeau_2', buttonText: { displayText: '+Cadeau' }, type: 1 },
        { buttonId: 'cadeau_3', buttonText: { displayText: 'Cadeau 3' }, type: 1 }
      ];

      // Envoyer l'image avec les boutons
      zk.sendMessage(origineMessage, { 
        image: { url: lien }, 
        caption: msg, 
        buttons: buttons, 
        headerType: 4  // Type 4 pour une image avec des boutons
      }, { quoted: ms });
    //}
  }
);
*/
