const fs = require('fs').promises;
const path = require('path');

async function getDB(file){

    const dbPath = path.join(process.cwd(), 'db', file);
    const data = await fs.readFile(dbPath, 'utf-8');

    if (!data) {
        return []; 
    }
    
    return JSON.parse(data);
}

async function storeDB(file, data){

    const dbPath = path.join(process.cwd(), 'db', file);
    await fs.writeFile(dbPath, JSON.stringify(data,null,2));

}

const DBConnection = {
    getDB,
    storeDB
}

module.exports = DBConnection;