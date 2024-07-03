import PiComponent from 'pyllar/component';

import MusicaModel from '../musica/MusicaModel';
import Marcador from '../marcador/Marcador';
import NotesCollection from '../note/NoteCollection';

import "./CifraView.css";

export default class CifraView extends PiComponent {
    view = /*html*/`<div class="cifra-view"><div class="titulo">{@_titulo}</div><div id="marcador" class="marcador"></div><pre id="content"></pre></div>`;

    _titulo = '';

    setStream(stream) {
        stream.onNewNote(note => {
            this.setMarcadorPosicao(note.position);
        });
    }

    async loadMusica(id, fn) {
        const musica = await (new MusicaModel()).get(id);
        this.setMusica(musica, fn);
    }

    setMusica(musica, fn) {
        this.$element.find("#content").html(musica.cifra.replace(/\([^)]+\)/gi, (note) => {
            return `<b>${note}</b>`
        }));

        this._titulo = musica.titulo;

        this._loadNotes();
        this._loadMarcador();

        this.setMarcadorPosicao(1);
        if (fn) fn();
    }

    setMarcadorPosicao(position) {
        this.marcador.move(this.notes.getNoteByPosition(position));
    }

    _loadMarcador() {
        this.marcador = new Marcador(this.$element.find("#marcador"));
    }

    _loadNotes() {
        this.notes = new NotesCollection(this.$element.find("#content").find('b'));
    }
}

PiComponent.register(CifraView);