const activeTimers = {};

async function simulateLoading(zk, origineMessage) {
    const frames = [
        "`❪▬▭▭▭▭▭▭▭▭❫`",
        "`❪▬▬▭▭▭▭▭▭▭❫`",
        "`❪▬▬▬▭▭▭▭▭▭❫`",
        "`❪▬▬▬▬▭▭▭▭▭❫`",
        "`❪▬▬▬▬▬▭▭▭▭❫`",
        "`❪▬▬▬▬▬▬▭▭▭❫`",
        "`❪▬▬▬▬▬▬▬▭▭❫`",
        "`❪▬▬▬▬▬▬▬▬▭❫`",
        "`❪▬▬▬▬▬▬▬▬▬❫`",
        "`❪▬▬▬▬100%▬▬▬❫`"
    ];

    try {
        let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde
            await zk.sendMessage(origineMessage, {
                text: frames[i],
                edit: { id: loadingMessage.key.id, remoteJid: origineMessage.key.remoteJid, fromMe: true }
            });
        }

        await zk.sendMessage(origineMessage, {
            text: "❪▬▬▬▬100%▬▬▬▬❫\nChargement terminé ! 🎉",
            edit: { id: loadingMessage.key.id, remoteJid: origineMessage.key.remoteJid, fromMe: true }
        });
    } catch (error) {
        console.error("Erreur lors de la simulation du chargement :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du chargement. 😢" });
    }
}

async function handleMessage({ zk, texte, origineMessage }) {
    const neoTexte = texte.toLowerCase();

    if (neoTexte.includes("chargement")) {
        await simulateLoading(zk, origineMessage);
    }
}

module.exports = handleMessage;
