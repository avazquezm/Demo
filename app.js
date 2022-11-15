import express from 'express';
import mysql from 'mysql2/promise';
import { connectionDB, serverPort } from './config/config.js';

const main = async() => {

    const app = express();
    const port = serverPort || 3000;

    // Conexión a base de datos
    const rows = await connectDB();

    // Servir contenido
    app.set('view engine', 'hbs');
    app.use(express.static('public'));

    // Ruta home
    app.get('/', (req, res) => {
        res.render('home', {data: rows});
    });

    // Levantar servidor
    app.listen(port, () => {
        console.log('App listening on port', port);
    });

}

const connectDB = async() => {

    const query = `
    select 
        product producto, 
        sum(quantity) cantidad, 
        round(avg(quantity * price),2) importe_medio
    from orders
    group by product
    order by 1;
    `;

    let db;

    try {
        db = await mysql.createConnection(connectionDB);
        const [rows, fields] = await db.query(query);

        return rows;

    } catch (error) {
        console.log(error);
        throw new Error('Error when connecting to database');   

    } finally{
        if(db) db.end();
    }
}

// Ejecución principal 
main();











