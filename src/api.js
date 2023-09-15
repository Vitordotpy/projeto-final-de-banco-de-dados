const http = require('http');
import {URL} from require('url');
const db = require('./db');

const currentUserId = 1;

const server = http.createServer((request, response)=>{
    const parsedUrl = new URL(`http://localhost:3000${request.url}`);
    // All tables paths
    const tables = ['/user', '/adress', '/contact', '/resource', '/rent'];
    // Starting database
    var cursor = new db();

    if(parsedUrl.method == 'GET' && tables.contains(parsedUrl.pathname)){
        cursor.select(parsedUrl.pathname, currentUserId);
    }
    if(parsedUrl.method == 'POST' && tables.contains(parsedUrl.pathname)){
        // Todo: create a function that grab request body and transform into postgresql values
        cursor.insert(parsedUrl.pathname, values);
    }
    if(parsedUrl.method == 'UPDATE' && tables.contains(parsedUrl.pathname)){
        // Todo: create a function that grab request body and transform into postgresql values
        cursor.update(parsedUrl.pathname, values, currentUserId);
    }
    if(parsedUrl.method == 'DELETE' && tables.contains(parsedUrl.pathname)){
        cursor.delete(parsedUrl.pathname, currentUserId);
    }
    
});

server.listen(3000, 'http://localhost');

