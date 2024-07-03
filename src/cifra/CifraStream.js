import MusicaModel from '../musica/MusicaModel';

export default class CifraStream {
    fnNewMusica = null;
    fnNewNote = null;

    constructor(host) {
        this.host = host;
    }

    onNewMusica(fn) {
        this.fnNewMusica = fn
    }

    onNewNote(fn) {
        this.fnNewNote = fn;
    }

    _processEvent(e) {
        try {
            const event = JSON.parse(e.data);

            if (event.type == 'new:musica') {
                (new MusicaModel()).get(event.id).then((musica) => {
                    if(this.fnNewMusica){
                        this.fnNewMusica(musica);
                    }
                });

                return;
            }

            if (event.type == 'note') {
                if(this.fnNewNote){
                    this.fnNewNote(event.note);
                }
            }
        } catch (error) {

        }
    }

    connect() {
        const socket = new WebSocket(this.host);

        socket.addEventListener('open', event => {
            console.log('Conectado ao servidor WebSocket');

            // Envia uma mensagem ao servidor
            socket.send('Olá servidor!');
        });

        // Quando uma mensagem é recebida do servidor
        socket.addEventListener('message', event => {
            this._processEvent(event);
            console.log('Recebido do servidor:', event);
        });

        // Quando a conexão é fechada
        socket.addEventListener('close', event => {
            console.log('Desconectado do servidor WebSocket');
        });
    }
};