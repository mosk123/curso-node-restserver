const express = require('express');
const cors = require('cors');


class Server {
 
    constructor(){
    
        this.app = express();
        this.port = process.env.PORT;
        // Declaro una variable con el path. De ese modos, se entiende cual es el path claramente.
        this.usuariosPath = '/api/usuarios';
        
        // MIDDLEWERES son funciones que agregan otras funciones al web server
        this.middleweres();
        // Rutas de mi aplicacion

        
        this.routes();
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



