const bd = require('pg');

const url = "postgres://professor:professor@database-3.cobbz7a38cty.us-east-1.rds.amazonaws.com/ealugueldb"

const client = new bd.Client(url);

function insertAdress(adress){
    client.connect();
    const query2 = client.query(`INSERT INTO mydb.adress (cep, cidade, uf, numero, bairro, complemento) VALUES ('${adress.cep}','${adress.cidade}','${adress.uf}',${adress.numero},'${adress.bairro}','${adress.complemento}')`);
    query2.then((response) => {
        console.log("Inserted: "+response.fields.values.toString);
        client.end();
    });
    
}

function selectAdress(id) {
    client.connect();
    const query = client.query(`SELECT id, cep, bairro, cidade FROM mydb.adress WHERE id=${id}`);
    query.then((response)=>  {
        console.log("Adress: "+response.rowCount);
        client.end();
    });
}

//insertAdress({cep:'49600000', cidade:'São Cristóvão', uf:'SE', numero:49, bairro:'Rosa Elze', complemento:'apt 3'});
//selectAdress(1);
