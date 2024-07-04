import PiComponent from 'pyllar/component';

import CifraModel from './CifraModel';

export default class CifrasListView extends PiComponent {
    view = /*html*/`<div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Versão</th>
                    <th scope="col">Tonalidade</th>
                </tr>
            </thead>
            <tbody>
                <tr :foreach="(index, cifra) in _cifras">
                    <th scope="row">{index + 1}</th>
                    <td><a :href="#{URL.ROUTE_EDIT_CIFRA.to(cifra.id)}">{cifra.titulo}</a></td>
                    <td>{cifra.versao}</td>
                    <td>{cifra.tonalidade}</td>
                </tr>
            </tbody>
        </table>
    </div>`;

    _cifras = [];

    viewDidLoad() {
        this._loadcifras();
    }

    setCifras(cifras) {
        this._cifras.clear().load(cifras);
    }

    _loadcifras() {
        (new CifraModel()).all().then(cifras => {
            this.setCifras(cifras);
        });
    }
};