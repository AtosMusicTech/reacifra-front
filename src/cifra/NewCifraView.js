import PiComponent from "pyllar/component";
import PiUrlHash from "pyllar/url_hash";

import MusicaModel from "../musica/MusicaModel";
import Transposicao from "../musica/Transposicao";
import UxButton from "../ux/UxButton";

import { ROUTE_EDIT_CIFRA } from "../routes";

import "./NewCifraView.css";

export default class NewCifraView extends PiComponent {
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
            label: 'Adicionar',
            classes: 'btn btn-sm btn-primary'
        });
    }

    salvar() {
        const musica = new MusicaModel();

        musica.inject(this);
        musica.cifra = this._getEditorHtml();

        musica.insert().then((musica) => {
            PiUrlHash.set(ROUTE_EDIT_CIFRA.HASH, musica.id);
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