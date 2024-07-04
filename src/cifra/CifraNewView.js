import PiComponent from "pyllar/component";

import CifraModel from "./CifraModel";
import Transposicao from "./Transposicao";
import UxButton from "../ux/UxButton";

import ImportCifra from "./ImportCifra";

import "./CifraNewView.css";

export default class CifraNewView extends PiComponent {
    view = `<div class="cifra-new">
        <fieldset>

            <div class="row">
                <div class="col-12">
                    <div class="mb-3 d-flex flex-row-reverse actions">
                        <button class="btn btn-secondary btn-sm" @click="importar()">Importar</button>
                        <button class="btn btn-secondary btn-sm" @click="transposeUp()">+ 1 Tom</button>
                        <button class="btn btn-secondary btn-sm" @click="transposeDown()">- 1 Tom</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Título</label>
                        <input type="text" data-model="titulo" class="form-control" placeholder="Título">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Versão</label>
                        <input type="text" data-model="versao" class="form-control" placeholder="Versão">
                    </div>
                </div>

                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Tonalidade</label>
                        <select @change="setTonalidade($value)" id="tontalidade" data-model="tonalidade" class="form-select" aria-label="Tonalidade">
                            <option value="">Nenhuma</option>
                            <option value="C">C</option>
                            <option value="C#">C#</option>
                            <option value="D">D</option>
                            <option value="D#">D#</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="F#">F#</option>
                            <option value="G">G</option>
                            <option value="G#">G#</option>
                            <option value="A">A</option>
                            <option value="A#">A#</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="mb-3">
                        <label class="form-label">Cifra</label>
                        <pre class="form-control" data-model="texto" id="editor" contenteditable="true"></pre>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="mb-3 d-flex flex-row-reverse actions">
                        <div name="save" @click="salvar()" component="UxButton"></div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>`;

    _titulo = '';

    instances() {
        this.save = new UxButton({
            label: 'Salvar',
            classes: 'btn btn-sm btn-primary'
        });

        this.cifra = new CifraModel();
    }

    viewDidLoad() {

    }

    salvar() {
        this.cifra.inject(this);

        this.cifra.insert().then(() => {
            this.save.unlock();
        });
    }

    transposeUp() {
        this._transposition(1);
    }

    transposeDown() {
        this._transposition(-1);
    }

    setTonalidade(to) {
        if (this.cifra.tonalidade == null) {
            this.cifra.tonalidade = to;
            return;
        }

        const semitones = Transposicao.semitones(this.cifra.tonalidade, to);
        this._transposition(semitones, false);
    }

    importar() {
        const _import = new ImportCifra();
        _import.render(this.$element, true);
        _import.open();
        _import.onImport((cifra) => {
            this.$element.find('#editor').html(cifra.texto);
        })
    }

    _transposition(semitones, updateTonalidade = true) {
        this.cifra.inject(this);

        const newCifra = this._replaceNotes(this.cifra.texto, (note) => {
            return Transposicao.transpose(note, semitones);
        });

        if (updateTonalidade) {
            this.cifra.tonalidade = Transposicao.transpose(this.cifra.tonalidade, semitones);
        }

        this.cifra.texto = newCifra;

        this.inject(this.cifra);
    }

    _replaceNotes(cifra, fn) {
        return cifra.replace(/\([^\)+]*\)/gi, (note) => {
            return `(${fn(note.replace('(', '').replace(')', ''))})`;
        });
    }
};