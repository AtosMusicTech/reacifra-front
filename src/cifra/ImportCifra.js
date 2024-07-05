import PiComponent from "pyllar/component";

import CifraModel from "./CifraModel";

export default class ImportCifra extends PiComponent {
    view = `<div class="modal fade show" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Importação Cifra</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <label for="url" class="form-label">URL</label>
                        <input type="text" class="form-control" id="url" aria-describedby="Url">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sair</button>
                <button @click="importar()" type="button" class="btn btn-primary">Importar</button>
            </div>
            </div>
        </div>
    </div>`;

    open() {
        this.modal = new bootstrap.Modal(this.$element);
        this.modal.show();
    }

    onImport(fn) {
        this.event.listen('on:import', fn);
    }

    async importar() {
        const url = this.$element.find('#url').val();
        if (url.length == 0) {
            this.modal.hide();
            return;
        }

        const model = new CifraModel();
        const data = await model.import(url)

        model.texto = data.texto.replace(/<b[^>]+>/g, '(').replace(/<\/b>/g, ')').replace(/<b>/g, '(');

        this.event.trigger('on:import', model);

        this.modal.hide();

        return model
    }
};