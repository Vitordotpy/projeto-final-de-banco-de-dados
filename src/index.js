const bd = require('pg');

const url = "postgres://professor:professor@database-3.cobbz7a38cty.us-east-1.rds.amazonaws.com/ealugueldb"

const client = new bd.Client(url);

client.connect();

function selectAdress(id) {
    const query = client.query(`SELECT id, cep, bairro, cidade FROM mydb.adress WHERE id=${id}`);
    query.then((response)=>  {
        console.log("Selected Adress:");
        response.rows.map(row => console.log(row));
        client.end();
    });
}

function insertAdress(adress){
    
    const query2 = client.query(`INSERT INTO mydb.adress (cep, cidade, uf, numero, bairro, complemento) VALUES ('${adress.cep}','${adress.cidade}','${adress.uf}',${adress.numero},'${adress.bairro}','${adress.complemento}')`);
    query2.then((response) => {
        if(response.rowCount > 0){
            console.log(`Inserted Adress:('${adress.cep}','${adress.cidade}','${adress.uf}',${adress.numero},'${adress.bairro}','${adress.complemento}')`);
            selectAdress(3);
        }

    });
    
}

insertAdress({cep:'49600000', cidade:'São Cristóvão', uf:'SE', numero:49, bairro:'Rosa Elze', complemento:'apt 3'});
