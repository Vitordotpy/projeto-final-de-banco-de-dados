const { Pool } = require('pg');

module.exports = class db {
    async connect() {
        var pool = new Pool({
            host: 'database-3.cobbz7a38cty.us-east-1.rds.amazonaws.com',
            port: '5432',
            user: 'professor',
            database: 'ealugueldb',
            password: 'professor',
        })
        return await pool.connect();
    }

    async insert(table, values) {
        const client = await this.connect();
        try {
            // Begin of a transaction
            await client.query('BEGIN');
            var sql;
            switch (table) {
                case '/user':
                    sql = `INSERT INTO mydb.user (contact_id, adress_id, cpf_cnpj, nome, sobrenome, email, senha, locador, status) VALUES ${values}`;
                    break;
                case '/adress':
                    sql = `INSERT INTO mydb.adress (cep, cidade, uf, numero, bairro, complemento) VALUES ${values}`;
                    break;
                case '/contact':
                    sql = `INSERT INTO mydb.contact (telefone, email, whatsapp) VALUES ${values}`;
                    break;
            }
            // Stacking the query
            await client.query(sql);
            // Trying to commit query
            await client.query('COMMIT');
        } catch (e) {
            // Roolback the query if got a exception
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async select(table, userId) {
        const client = await this.connect();
        try {
            // Begin of a transaction
            await client.query('BEGIN');
            var sql;
            switch (table) {
                case '/user':
                    sql = `SELECT * FROM mydb.user WHERE id=${userId}`;
                    break;
                case '/adress':
                    sql = `SELECT * FROM mydb.adress WHERE id=${userId}`;
                    break;
                case '/contact':
                    sql = `SELECT * FROM mydb.contact WHERE id=${userId}`;
                    break;
            }
            // Stacking the query
            const result = await client.query(sql);
            // Trying to commit query
            await client.query('COMMIT').then((values) => {console.log(JSON.stringify(result.rows));});
            
        } catch (e) {
            // Roolback the query if got a exception
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async delete(table, userId) {
        const client = await this.connect();
        try {
            // Begin of a transaction
            await client.query('BEGIN');
            var sql;
            switch (table) {
                case '/user':
                    sql = `DELETE FROM mydb.user WHERE id=${userId}`;
                    break;
                case '/adress':
                    sql = `DELETE FROM mydb.adress WHERE id=${userId}`;
                    break;
                case '/contact':
                    sql = `DELETE FROM mydb.contact WHERE id=${userId}`;
                    break;
            }
            // Stacking the query
            await client.query(sql);
            // Trying to commit query
            await client.query('COMMIT');

        } catch (e) {
            // Roolback the query if got a exception
            await client.query('ROLLBACK');

            throw e;
        } finally {
            client.release();
        }
    }

    async update(table, values, userId) {
        const client = await this.connect();
        try {
            // Begin of a transaction
            await client.query('BEGIN');
            var sql;
            switch (table) {
                case '/user':
                    sql = `UPDATE mydb.user SET ${values} WHERE id=${userId}`;
                    break;
                case '/adress':
                    sql = `UPDATE mydb.adress SET ${values} WHERE id=${userId}`;
                    break;
                case '/contact':
                    sql = `UPDATE mydb.contact SET ${values} WHERE id=${userId}`;
                    break;
            }
            // Stacking the query
            await client.query(sql);
            // Trying to commit query
            await client.query('COMMIT');
        } catch (e) {
            // Roolback the query if got a exception
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
}