const { zokou } = require('../framework/zokou');
const neoDB = require('../bdd/neo_tickets');

zokou({ nomCom: 'ticketbet', reaction: '🎫', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms, superUser }) => {
    try {
        if (!arg || arg.length === 0) {
            const ticketVierge = `.            *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░

*👥Parieur*: [Nom du parieur]
*🛡️Modérateur*: [Nom du modérateur]
*💰Somme misée*: [Montant de la mise]🧭

*📜Liste des paris placés*:
➤ [Valeur du pari 1] × [Cote du pari 1]
➤ [Valeur du pari 2] × [Cote du pari 2]
➤ [Valeur du pari 3] × [Cote du pari 3]


*💰Gains Possibles*: [Montant des gains possibles]🧭
═══════════░▒▒▒▒░░▒░
                  *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴🎮*`;
            return repondre(ticketVierge);
        }

        const action = arg[0].toLowerCase();

        if (action === 'list') {
            if (!superUser) return repondre('🔒 Réservé aux admins');
            const searchTerm = arg[1];
            const tickets = searchTerm 
                ? await neoDB.searchTickets(searchTerm)
                : await neoDB.getAllTickets();
            if (tickets.length === 0) return repondre('Aucun ticket trouvé');
            let message = `📋 *Liste des Tickets* (${tickets.length})\n▔▔▔▔▔▔▔▔▔▔▔▔\n`;
            tickets.forEach(ticket => {
                const status = ticket.statuts.includes('echec') ? '❌ Perdu' : 
                             ticket.statuts.includes('victoire') ? '✅ Gagné' : '⌛ En cours';
                message += `• *${ticket.parieur}* - Mise: ${ticket.mise} - ${status}\n`;
            });
            return repondre(message);
        }

        if (action === 'parieur' && arg[1] === '=') {
            const parieur = arg.slice(2).join(' ');
            await neoDB.createTicket(parieur);
            return repondre(`Ticket créé pour ${parieur}`);
        }

        const parieur = arg[0];
        const ticketData = await neoDB.getTicket(parieur);
        
        if (!ticketData && action !== 'clear') {
            return repondre(`Aucun ticket trouvé pour ${parieur}`);
        }

        if (arg[1] === 'modo' && arg[2] === '=') {
            const modo = arg.slice(3).join(' ');
            await neoDB.updateTicket(parieur, { modo });
            return repondre(`Modérateur mis à jour: ${modo}`);
        }

        if (arg[1] === 'mise' && ['+', '-'].includes(arg[2])) {
            const operation = arg[2];
            const montant = parseFloat(arg[3]);
            const newMise = operation === '+' ? ticketData.mise + montant : ticketData.mise - montant;
            await neoDB.updateTicket(parieur, { mise: newMise });
            return repondre(`Mise mise à jour: ${newMise}`);
        }

        if (arg[1].startsWith('pari') && arg[2] === '=') {
            const pariIndex = parseInt(arg[1].replace('pari', '')) - 1;
            const pariNom = arg.slice(3).join(' ');
            const paris = Array.isArray(ticketData.paris) ? [...ticketData.paris] : [];
            const statuts = Array.isArray(ticketData.statuts) ? [...ticketData.statuts] : [];
            
            if (!paris[pariIndex]) {
                paris[pariIndex] = { nom: pariNom, cote: 1.0 };
            } else {
                paris[pariIndex].nom = pariNom;
            }
            
            if (!statuts[pariIndex]) statuts[pariIndex] = '';
            
            await neoDB.updateTicket(parieur, { paris, statuts });
            return repondre(`Pari ${pariIndex + 1} mis à jour: ${pariNom}`);
        }

        if (arg[1].startsWith('cote') && arg[2] === '=') {
            const pariIndex = parseInt(arg[1].replace('cote', '')) - 1;
            const pariCote = parseFloat(arg[3]);
            
            if (isNaN(pariCote)) return repondre('La cote doit être un nombre');
            
            const paris = Array.isArray(ticketData.paris) ? [...ticketData.paris] : [];
            
            if (!paris[pariIndex]) {
                paris[pariIndex] = { nom: 'Pari à définir', cote: pariCote };
            } else {
                paris[pariIndex].cote = pariCote;
            }
            
            await neoDB.updateTicket(parieur, { paris });
            return repondre(`Cote ${pariIndex + 1} mise à jour: ${pariCote}`);
        }

        if (arg[1].startsWith('pari') && arg[2] === 'statut') {
            const pariIndex = parseInt(arg[1].replace('pari', '')) - 1;
            const statut = arg[3];
            const statuts = [...ticketData.statuts];
            statuts[pariIndex] = statut;
            await neoDB.updateTicket(parieur, { statuts });
            const emoji = statut === 'victoire' ? '✅' : '❌';
            return repondre(`Statut du pari ${pariIndex + 1} mis à jour: ${emoji}`);
        }

        if (arg.length === 1) {
            const ticketContent = await neoDB.generateTicketContent(ticketData);
            return repondre(ticketContent);
        }

        if (action === 'clear') {
            if (!superUser) return repondre('Action réservée aux administrateurs');
            if (arg[1].toLowerCase() === 'all') {
                await neoDB.deleteAllTickets();
                return repondre('Tous les tickets ont été supprimés');
            } else {
                await neoDB.deleteTicket(arg[1]);
                return repondre(`Ticket de ${arg[1]} supprimé`);
            }
        }

        repondre("Commande non reconnue. Syntaxe:\n" +
                 "- ticketbet (affiche ticket vierge)\n" +
                 "- ticketbet [parieur] pari[1-9] = [nom du pari]\n" +
                 "- ticketbet [parieur] cote[1-9] = [cote]");

    } catch (error) {
        console.error("Erreur:", error);
        repondre("Une erreur est survenue: " + error.message);
    }
});
