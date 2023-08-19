const bd = require('pg');

const url = "postgres://professor:professor@database-3.cobbz7a38cty.us-east-1.rds.amazonaws.com/ealugueldb"

const client = new bd.Client(url);

function insertUser(CPF_CNPJ){
    client.connect();
    var insert;
    const query = client.query(`SELECT id FROM mybd.User WHERE id=${CPF_CNPJ}`);
    query.then((response) => insert = response == null);
    if( insert ){
        const query2 = client.query(`INSERT INTO mybd.User VALUES ()`);
        query2.then((response) => console.log("Inserted: "+response.fields));
    }
    client.end();
}

function selectUser(CPF_CNPJ){
    client.connect();
    const query = client.query(`SELECT id FROM mybd.User WHERE id=${CPF_CNPJ}`);
    query.then((response)=> console.log("User: "+response.fields));
}