import * as dotenv from 'dotenv';
dotenv.config();

const connectionDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
}

const serverPort = process.env.PORT;

export{
    connectionDB,
    serverPort
}