import PiComponent from "pyllar/component";

import CifraModel from "./CifraModel";
import Transposicao from "./Transposicao";
import UxButton from "../ux/UxButton";

import "./CifraEditView.css";
import CifraView from "./CifraView";

export default class CifraEditView extends PiComponent {
    view = `<div class="cifra-edit">
        <fieldset>

            <div class="row">
                <div class="col-12">
                    <div style="position: sticky; top: 0;" class="mb-3 d-flex flex-row-reverse actions">
                        <button class="btn btn-secondary btn-sm" @click="transposeUp()">+ 1 Tom</button>
                        <button class="btn btn-secondary btn-sm" @click="transposeDown()">- 1 Tom</button>
                        <div name="save" @click="salvar()" component="UxButton"></div>
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
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Cifra</label>
                        <pre class="form-control" data-model="texto" @keyup="_updateRender()" id="editor" contenteditable="true"></pre>
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Preview</label>
                        <div name="preview" component="CifraView" style="background: #f2f2f2; padding: 10px 20px;border-radius: 5px;"></div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>`;

    _titulo = '';

    instances() {
        this.preview = new CifraView({
            viewMarker: false
        });

        this.save = new UxButton({
            label: 'Salvar',
            classes: 'btn btn-sm btn-primary'
        });
    }

    viewDidLoad() {
        this._handleEvents();
    }

    loadCifra(id) {
        (new CifraModel()).get(id).then((cifra) => {
            this.setCifra(cifra);
        });
    }

    setCifra(cifra) {
        this.cifra = cifra;
        this.inject(cifra);
        this._updatePreview();
    }

    salvar() {
        this.cifra.inject(this);

        this.cifra.save().then(() => {
            this.save.unlock();
            $.notify("Cifra Salva!", "success");
        });
    }

    transposeUp() {
        this._transposition(1);
    }

    transposeDown() {
        this._transposition(-1);
    }

    setTonalidade(to) {
        const semitones = Transposicao.semitones(this.cifra.tonalidade, to);
        this._transposition(semitones, false);
    }

    _updateRender() {
        this.cifra.inject(this);
        this._updatePreview();
    }

    _updatePreview() {
        this.preview.setCifra(this.cifra);
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

        this.setCifra(this.cifra);
    }

    _replaceNotes(cifra, fn) {
        return cifra.replace(/\([^\)+]*\)/gi, (note) => {
            return `(${fn(note.replace('(', '').replace(')', ''))})`;
        });
    }

    _handleEvents() {
        $(document).on('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.salvar();
            }
        });
    }
};