import { Pool } from 'pg';

module.exports = class db {
    url = "postgres://professor:professor@database-3.cobbz7a38cty.us-east-1.rds.amazonaws.com/ealugueldb"

    client; 

    constructor() {
        this.client = new Pool(url);
        this.connect();
    }

    connect(){
        this.client.connect();
    }

    release(){
        this.client.release();
    }

    async insert(table, values)  {
        try {
            // Begin of a transaction
            await this.client.query('BEGIN');
            var sql;
            switch (table) {
                case 'user':
                    sql = `INSERT INTO mydb.user VALUES ${values}`;
                    break;
                case 'adress':
                    sql = `INSERT INTO mydb.adress VALUES ${values}`;
                    break;
                case 'contact':
                    sql = `INSERT INTO mydb.contact VALUES ${values}`;
                    break;
                case 'resource':
                    sql = `INSERT INTO mydb.resource VALUES ${values}`;
                    break;
                case 'rent':
                    sql = `INSERT INTO mydb.rent VALUES ${values}`;
                    break;
            }
            // Stacking the query
            await this.client.query(sql);
            // Trying to commit query
            await this.client.query('COMMIT');
            this.release();
        } catch (e) {
            // Roolback the query if got a exception
            await this.client.query('ROOLBACK');
            throw e;
        }
    }

    async select(table, userId)  {
        try {
            // Begin of a transaction
            await this.client.query('BEGIN');
            var sql;
            switch (table) {
                case 'user':
                    sql = `SELECT * FROM mydb.user WHERE id=${userId}`;
                    break;
                case 'adress':
                    sql = `SELECT * FROM mydb.adress WHERE id=${userId}`;
                    break;
                case 'contact':
                    sql = `SELECT * FROM mydb.contact WHERE id=${userId}`;
                    break;
                case 'resource':
                    sql = `SELECT * FROM mydb.resource WHERE id=${userId}`;
                    break;
                case 'rent':
                    sql = `SELECT * FROM mydb.rent WHERE id=${userId}`;
                    break;
            }
            // Stacking the query
            await this.client.query(sql);
            // Trying to commit query
            await this.client.query('COMMIT');
            this.release();
        } catch (e) {
            // Roolback the query if got a exception
            await this.client.query('ROOLBACK');
            throw e;
        }
    }

    async delete(table, userId)  {
        try {
            // Begin of a transaction
            await this.client.query('BEGIN');
            var sql;
            switch (table) {
                case 'user':
                    sql = `DELETE FROM mydb.user WHERE id=${userId}`;
                    break;
                case 'adress':
                    sql = `DELETE FROM mydb.adress WHERE id=${userId}`;
                    break;
                case 'contact':
                    sql = `DELETE FROM mydb.contact WHERE id=${userId}`;
                    break;
                case 'resource':
                    sql = `DELETE FROM mydb.resource WHERE id=${userId}`;
                    break;
                case 'rent':
                    sql = `DELETE FROM mydb.rent WHERE id=${userId}`;
                    break;
            }
            // Stacking the query
            await this.client.query(sql);
            // Trying to commit query
            await this.client.query('COMMIT');
            this.release();
        } catch (e) {
            // Roolback the query if got a exception
            await this.client.query('ROOLBACK');
            throw e;
        }
    }

    async update(table, values, userId)  {
        try {
            // Begin of a transaction
            await this.client.query('BEGIN');
            var sql;
            switch (table) {
                case 'user':
                    sql = `UPDATE mydb.user SET ${values} WHERE id=${userId}`;
                    break;
                case 'adress':
                    sql = `UPDATE mydb.user SET ${values} WHERE id=${userId}`;
                    break;
                case 'contact':
                    sql = `UPDATE mydb.user SET ${values} WHERE id=${userId}`;
                    break;
                case 'resource':
                    sql = `UPDATE mydb.user SET ${values} WHERE id=${userId}`;
                    break;
                case 'rent':
                    sql = `UPDATE mydb.user SET ${values} WHERE id=${userId}`;
                    break;
            }
            // Stacking the query
            await this.client.query(sql);
            // Trying to commit query
            await this.client.query('COMMIT');
            this.release();
        } catch (e) {
            // Roolback the query if got a exception
            await this.client.query('ROOLBACK');
            throw e;
        }
    }
}