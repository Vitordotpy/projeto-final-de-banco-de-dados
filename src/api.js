const http = require('http');
const db = require('./db');

const currentUserId = 1;

const server = http.createServer((request, response)=>{

    if(request.method == 'GET' && request.url == 'user'){
        var cursor = new db();
        cursor.select('user', currentUserId);
    }
});

server.listen(3000, 'http://localhost');

