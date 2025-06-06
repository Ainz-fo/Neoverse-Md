const { Pool } = require("pg");
const s = require("../set");
const { getJidFromLid } = require("./cache_jid");

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

// 📌 Création de la table `team`
async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS team (
        id TEXT PRIMARY KEY,
        users TEXT DEFAULT 'aucun',
        team TEXT DEFAULT 'aucune',
        points_jeu INTEGER DEFAULT 0,
        rank TEXT DEFAULT 'aucun',
        argent INTEGER DEFAULT 0,
        puissance INTEGER DEFAULT 0,
        classement TEXT DEFAULT 'aucun',
        wins INTEGER DEFAULT 0,
        loss INTEGER DEFAULT 0,
        draws INTEGER DEFAULT 0,
        championnats INTEGER DEFAULT 0,
        nel INTEGER DEFAULT 0
      );
    `);
    console.log("✅ Table 'team' créée avec succès");
  } catch (error) {
    console.error("❌ Erreur création table:", error);
  } finally {
    client.release();
  }
}
createTable();

// Fonction interne pour récupérer le jid à partir du lid
async function resolveJid(lid) {
  const jid = await getJidFromLid(lid);
  if (!jid) throw new Error("JID introuvable pour le lid donné");
  return jid;
}

// 📌 Obtenir les données d’un utilisateur
async function getUserData(lid) {
  const client = await pool.connect();
  try {
    const jid = await resolveJid(lid);
    const res = await client.query("SELECT * FROM team WHERE id = $1", [jid]);
    return res.rows[0];
  } catch (err) {
    console.error("❌ Erreur récupération utilisateur:", err);
    return null;
  } finally {
    client.release();
  }
}

// 📌 Enregistrement d’un utilisateur (avec ou sans données personnalisées)
async function saveUser(lid, data = {}) {
  const client = await pool.connect();
  try {
    const jid = await resolveJid(lid);

    const result = await client.query("SELECT * FROM team WHERE id = $1", [jid]);
    if (result.rows.length > 0) {
      return "⚠️ Ce joueur est déjà enregistré.";
    }

    const {
      users = "aucun",
      team = "aucune",
      points_jeu = 0,
      rank = "aucun",
      argent = 0,
      puissance = 0,
      classement = "aucun",
      wins = 0,
      loss = 0,
      draws = 0,
      championnats = 0,
      nel = 0
    } = data;

    await client.query(
      `INSERT INTO team 
        (id, users, team, points_jeu, rank, argent, puissance, classement, wins, loss, draws, championnats, nel)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [jid, users, team, points_jeu, rank, argent, puissance, classement, wins, loss, draws, championnats, nel]
    );

    return "✅ Joueur enregistré avec succès.";
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement:", error);
    return "❌ Une erreur est survenue lors de l'enregistrement.";
  } finally {
    client.release();
  }
}

// 📌 Suppression d’un utilisateur
async function deleteUser(lid) {
  const client = await pool.connect();
  try {
    const jid = await resolveJid(lid);
    const result = await client.query("DELETE FROM team WHERE id = $1 RETURNING *", [jid]);
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

// 📌 Mise à jour des champs de l’utilisateur
async function updateUser(lid, updates) {
  const client = await pool.connect();
  try {
    const jid = await resolveJid(lid);

    const keys = Object.keys(updates);
    const values = Object.values(updates);
    if (keys.length === 0) return "⚠️ Aucun champ à mettre à jour.";

    const setQuery = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
    await client.query(`UPDATE team SET ${setQuery} WHERE id = $1`, [jid, ...values]);

    return "✅ Données mises à jour avec succès.";
  } catch (error) {
    console.error("❌ Erreur mise à jour utilisateur:", error);
    return "❌ Une erreur est survenue lors de la mise à jour.";
  } finally {
    client.release();
  }
}

module.exports = {
  saveUser,
  deleteUser,
  updateUser,
  getUserData,
};
