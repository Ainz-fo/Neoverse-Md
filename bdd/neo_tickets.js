const { Pool } = require('pg');
const s = require("../set");

class NeoTicketsDB {
    constructor() {
        this.pool = new Pool({ 
            connectionString: s.DB, 
            ssl: { rejectUnauthorized: false } 
        });
        this.initDB();
    }

    async initDB() {
        const client = await this.pool.connect();
        try {
            await client.query(`
                CREATE TABLE IF NOT EXISTS neo_tickets (
                    id SERIAL PRIMARY KEY,
                    parieur TEXT NOT NULL UNIQUE,
                    modo TEXT DEFAULT '',
                    mise NUMERIC DEFAULT 0,
                    paris JSONB DEFAULT '[]',
                    statuts JSONB DEFAULT '[]',
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                )
            `);
        } finally {
            client.release();
        }
    }

    async createTicket(parieur) {
        const res = await this.pool.query(
            'INSERT INTO neo_tickets (parieur) VALUES ($1) RETURNING *',
            [parieur]
        );
        return res.rows[0];
    }

    async getTicket(parieur) {
        const res = await this.pool.query(
            'SELECT * FROM neo_tickets WHERE parieur = $1',
            [parieur]
        );
        return res.rows[0];
    }

    async updateTicket(parieur, updates) {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        for (const [field, value] of Object.entries(updates)) {
            fields.push(`${field} = $${paramIndex}`);
            values.push(value);
            paramIndex++;
        }

        values.push(parieur);
        const query = `
            UPDATE neo_tickets 
            SET ${fields.join(', ')}, updated_at = NOW() 
            WHERE parieur = $${paramIndex} 
            RETURNING *
        `;

        const res = await this.pool.query(query, values);
        return res.rows[0];
    }

    async deleteTicket(parieur) {
        await this.pool.query(
            'DELETE FROM neo_tickets WHERE parieur = $1',
            [parieur]
        );
    }

    async deleteAllTickets() {
        await this.pool.query('DELETE FROM neo_tickets');
    }

    async getAllTickets() {
        const res = await this.pool.query('SELECT * FROM neo_tickets ORDER BY created_at DESC');
        return res.rows;
    }

    async searchTickets(searchTerm) {
        const res = await this.pool.query(
            'SELECT * FROM neo_tickets WHERE parieur ILIKE $1 ORDER BY created_at DESC',
            [`%${searchTerm}%`]
        );
        return res.rows;
    }

    async calculateGains(mise, paris = [], statuts = []) {
        if (!paris || paris.length === 0) return 0;
        
        const tousGagnants = statuts.every(s => s === 'victoire');
        if (!tousGagnants) return 0;

        const totalCotes = paris.reduce((acc, pari) => {
            const cote = parseFloat(pari?.cote) || 1;
            return acc * cote;
        }, 1);
        
        return mise * totalCotes;
    }

    async generateTicketContent(ticketData) {
        const parisList = (ticketData.paris || [])
            .map((pari, index) => {
                const statut = ticketData.statuts?.[index] || '';
                const emoji = statut === 'victoire' ? '✅' : 
                            statut === 'echec' ? '❌' : '';
                return `➤ ${emoji} ${pari?.nom || 'Pari ' + (index + 1)} × ${pari?.cote || '1.0'}`;
            })
            .join('\n');

        const statuts = ticketData.statuts || [];
        const statutGeneral = 
            statuts.includes('echec') ? 'Perdu' : 
            (statuts.length > 0 && statuts.every(s => s === 'victoire')) ? 'Gagné' : 
            'En attente';

        const gains = await this.calculateGains(ticketData.mise, ticketData.paris, ticketData.statuts);

        return `.            *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░

*👥Parieur*: ${ticketData.parieur}
*🛡️Modérateur*: ${ticketData.modo || 'Aucun'}
*💰Somme misée*: ${ticketData.mise}🧭
*📜Statut du ticket*: ${statutGeneral}

*📜Liste des paris placés*:
${parisList || 'Aucun pari'}

*💰Gains Possibles*: ${gains}🧭
═══════════░▒▒▒▒░░▒░
                  *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴🎮*`;
    }
}

module.exports = new NeoTicketsDB();
