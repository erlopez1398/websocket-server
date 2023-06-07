const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.phats = {}

        this.middlewares();

        this.routes();

        //Sockets
        this.sockets();
    }




    middlewares() {
        //cors
        this.app.use(cors());

        //directorio publico
        this.app.use(express.static('public'));
    }

    
    routes() {
        //this.app.use(this.phats.auth, require('../routes/auth'));
    }

    
    
    sockets() {

        this.io.on('connection', socketController);
    }

    
    listen() {
        this.server.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server; 