import PiComponent from "pyllar/component";

import MusicaModel from "../musica/MusicaModel";
import Transposicao from "../musica/Transposicao";
import UxButton from "../ux/UxButton";

import "./EditCifraView.css";

export default class EditCifraView extends PiComponent {
    view = `<div class="edit-cifra">
        <fieldset>

            <div class="mb-3 d-flex flex-row-reverse actions">
                <button class="btn btn-secondary btn-sm" @click="transposeUp()">+ 1 Tom</button>
                <button class="btn btn-secondary btn-sm" @click="transposeDown()">- 1 Tom</button>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Título</label>
                <input type="text" data-model="titulo" class="form-control" placeholder="Título">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Versão</label>
                <input type="text" data-model="versao" class="form-control" placeholder="Versão">
            </div>

            <div class="mb-3">
                <pre class="form-control" data-model="cifra" id="editor" contenteditable="true"></pre>
            </div>

            <div class="mb-3 d-flex flex-row-reverse actions">
                <div name="save" @click="salvar()" component="UxButton"></div>
            </div>
        </fieldset>
    </div>`;

    _titulo = '';

    instances() {
        this.save = new UxButton({
            label: 'Salvar',
            classes: 'btn btn-sm btn-primary'
        });
    }

    loadMusica(id) {
        (new MusicaModel()).get(id).then((musica) => {
            this.setMusica(musica);
        });
    }

    setMusica(musica) {
        this.musica = musica;

        this.inject(musica);
        this._setEditorHtml(musica.cifra);
    }

    salvar() {
        this.musica.inject(this);
        this.musica.cifra = this._getEditorHtml();

        this.musica.save().then(() => {
            this.save.unlock();
        });
    }

    transposeUp() {
        const cifra = this._getEditorHtml();

        this._replaceNotes(cifra, (note) => {
            return Transposicao.up(note);
        });
    }

    transposeDown() {
        const cifra = this._getEditorHtml();

        this._replaceNotes(cifra, (note) => {
            return Transposicao.down(note);
        });
    }

    _replaceNotes(cifra, fn) {
        const notes = /\([^\)+]*\)/gi.exec(cifra);

        const newCifra = cifra.replace(/\([^\)+]*\)/gi, (note) => {
            return `(${fn(note.replace('(', '').replace(')', ''))})`;
        });

        this._setEditorHtml(newCifra);
    }

    _setEditorHtml(html) {
        this.$element.find('#editor').html(html);
    }

    _getEditorHtml() {
        return this.$element.find('#editor').html();
    }
};