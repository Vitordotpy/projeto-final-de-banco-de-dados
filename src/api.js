const http = require('http');
const {URL} = require('url');
const db = require('./db');

const currentUserId = 1;
const mockAdressInsert = `('49100000', 'São Cristóvão', 'SE', 9999, 'Rosa Elze', 'apt 3')`;
const mockAdressUpdate = `(numero=1111)`;
const mockContactInsert = `(79999999999, 'email@email.com', 79999999999)`;
const mockContactUpdate = `(email='email2@email.com')`;
const mockUserInsert = `(1, 3, '21875381503', 'Fulano', 'Ciclano', 'email@email.com','senha123',0, 'Active')`;
const mockUserUpdate = `(email='email2@email.com')`;

// Identify witch table and witch operation are to use
function identifyMock(table, isInsert){
    switch(table){
        case '/user':
            return isInsert ? mockUserInsert : mockUserUpdate;
        case '/adress':
            return isInsert ? mockAdressInsert : mockAdressUpdate;
        case '/contact':
            return isInsert ? mockContactInsert : mockContactUpdate;
    }
}

function setResponse(response, mensagem){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(`<h1>${mensagem}</h1>`);
}

const server = http.createServer((request, response)=>{
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);
    // All tables paths
    const tables = ['/user', '/adress', '/contact'];
    // Starting database
    var cursor = new db();

    if(request.method == 'GET' && tables.indexOf(parsedUrl.pathname)>=0){
        cursor.select(parsedUrl.pathname, currentUserId);
        setResponse(response, 'Selecionou');
    }
    else if(request.method == 'POST' && tables.indexOf(parsedUrl.pathname)>=0){
        console.log(identifyMock(parsedUrl.pathname, true));
        cursor.insert(parsedUrl.pathname, identifyMock(parsedUrl.pathname, true));
        setResponse(response, 'Inseriu');
    }
    else if(request.method == 'PUT' && tables.indexOf(parsedUrl.pathname)>=0){
        cursor.update(parsedUrl.pathname, identifyMock(parsedUrl.pathname, false), currentUserId);
        setResponse(response, 'Atualizou');
    }
    else if(request.method == 'DELETE' && tables.indexOf(parsedUrl.pathname)>=0){
        cursor.delete(parsedUrl.pathname, currentUserId);
        setResponse(response, 'Deletou');
    }else{
        // Endpoint ou tabela não existe
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`<h1>The path ${parsedUrl.pathname} does not exists</h1>`);
    }
    
});

server.listen(3000);

