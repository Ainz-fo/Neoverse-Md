const { Pool } = require("pg");
const s = require("../set");
const { getJidFromLid } = require("./cache_jid");

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

// 📌 Création de la table
async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS blue_lock_stats (
        id TEXT PRIMARY KEY,
        nom TEXT NOT NULL,
        ${[...Array(15).keys()].map(i => `joueur${i + 1} TEXT DEFAULT 'aucun'`).join(", ")},
        ${[...Array(10).keys()].map(i => `stat${i + 1} INTEGER DEFAULT 100`).join(", ")}
      );
    `);
    console.log("✅ Table créée avec succès");
  } catch (error) {
    console.error("❌ Erreur création table:", error);
  } finally {
    client.release();
  }
}
createTable()

// 📌 Sauvegarde d'un utilisateur en convertissant lid → jid
async function saveUser(lid, nom) {
  const jid = await getJidFromLid(lid);
  if (!jid) return "⚠️ Impossible de récupérer le JID.";

  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM blue_lock_stats WHERE id = $1", [jid]);
    if (result.rows.length === 0) {
      await client.query("INSERT INTO blue_lock_stats (id, nom) VALUES ($1, $2)", [jid, nom]);
      return "✅ Joueur enregistré avec succès.";
    }
    return "⚠️ Ce joueur est déjà enregistré.";
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement:", error);
    return "❌ Une erreur est survenue lors de l'enregistrement.";
  } finally {
    client.release();
  }
}

async function deleteUser(lid) {
  const jid = await getJidFromLid(lid);
  if (!jid) return "⚠️ Impossible de récupérer le JID.";

  const client = await pool.connect();
  try {
    const result = await client.query("DELETE FROM blue_lock_stats WHERE id = $1 RETURNING *", [jid]);
    if (result.rowCount > 0) {
      return "✅ Joueur supprimé avec succès.";
    }
    return "⚠️ Joueur introuvable.";
  } catch (error) {
    console.error("❌ Erreur lors de la suppression:", error);
    return "❌ Une erreur est survenue lors de la suppression.";
  } finally {
    client.release();
  }
}

// 📌 Récupération des données d'un joueur
async function getUserData(lid) {
  const jid = await getJidFromLid(lid);
  if (!jid) return null;

  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM blue_lock_stats WHERE id = $1", [jid]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("❌ Erreur récupération données:", error);
    return null;
  } finally {
    client.release();
  }
}

// 📌 Mise à jour des joueurs
async function updatePlayers(lid, updates) {
  const jid = await getJidFromLid(lid);
  if (!jid) return "⚠️ Impossible de récupérer le JID.";

  const client = await pool.connect();
  try {
    const existingData = await getUserData(lid);
    if (!existingData) return "⚠️ Joueur introuvable.";

    const updateFields = Object.keys(updates);
    const updateValues = Object.values(updates);
    const setQuery = updateFields.map((key, i) => `${key} = $${i + 2}`).join(", ");

    await client.query(`UPDATE blue_lock_stats SET ${setQuery} WHERE id = $1`, [jid, ...updateValues]);
    return `✅ Mises à jour effectuées pour ${existingData.nom}`;
  } catch (error) {
    console.error("❌ Erreur mise à jour joueurs:", error);
    return "❌ Une erreur est survenue lors de la mise à jour.";
  } finally {
    client.release();
  }
}

// 📌 Mise à jour d'une statistique spécifique
async function updateStats(lid, statKey, signe, newValue) {
  const jid = await getJidFromLid(lid);
  if (!jid) return "⚠️ Impossible de récupérer le JID.";

  const client = await pool.connect();
  try {
    const existingData = await getUserData(lid);
    if (!existingData) return "⚠️ Joueur introuvable.";

    const oldValue = existingData[statKey] || 0; // Prend 0 si aucune valeur existante
    const updatedValue = signe === "+" ? oldValue + newValue : oldValue - newValue;

    await client.query(`UPDATE blue_lock_stats SET ${statKey} = $2 WHERE id = $1`, [jid, updatedValue]);

    return `✅ ${statKey.replace("stat", "Statistique ")} mise à jour : ${oldValue} ${signe} ${newValue} = ${updatedValue} pour ${existingData.nom}`;
  } catch (error) {
    console.error("❌ Erreur mise à jour stats:", error);
    return "❌ Une erreur est survenue lors de la mise à jour.";
  } finally {
    client.release();
  }
}

// 📌 Réinitialisation des statistiques
async function resetStats(lid) {
  const jid = await getJidFromLid(lid);
  if (!jid) return "⚠️ Impossible de récupérer le JID.";

  const client = await pool.connect();
  try {
    const existingData = await getUserData(lid);
    if (!existingData) return "⚠️ Joueur introuvable.";

    await client.query(
      `UPDATE blue_lock_stats SET ${[...Array(10).keys()].map(i => `stat${i + 1} = 100`).join(", ")} WHERE id = $1`,
      [jid]
    );
    return `✅ Toutes les stats ont été remises à 100 pour ${existingData.nom}!`;
  } catch (error) {
    console.error("❌ Erreur réinitialisation stats:", error);
    return "❌ Une erreur est survenue lors de la réinitialisation.";
  } finally {
    client.release();
  }
}

module.exports = {
  saveUser,
  deleteUser,
  getUserData,
  updatePlayers,
  updateStats,
  resetStats,
};
