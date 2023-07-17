const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
 
    constructor(){
    
        this.app = express();
        this.port = process.env.PORT;
        // Declaro una variable con el path. De ese modo, se entiende cual es el path claramente.
        this.usuariosPath = '/api/usuarios';

        //Declaro el path de autenticacion
        this.authPath = '/api/auth';

        // Conectar a base de datos.
        this.conectarDB();

        
        // MIDDLEWERES son funciones que agregan otras funciones al web server
        this.middleweres();
        
        
        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleweres(){
        // Cors
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use( express.json() );


        // Directorio publico.
        this.app.use( express.static('public') );

    }

    routes(){
        // Declaro el nuevo path de autenticacion de usuario con token.
        this.app.use(this.authPath, require('../routes/auth'));

        // Aqui se declara el path '/api/usuarios' y la ruta donde estan definidos.
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
          })
    }

}


module.exports = Server;



