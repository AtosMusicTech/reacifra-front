import PiComponent from 'pyllar/component';

import CifraModel from './CifraModel';
import QueueModel from '../queue/QueueModel';

export default class CifrasListView extends PiComponent {
    view = /*html*/`<div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Versão</th>
                    <th scope="col">Tonalidade</th>
                    <th scope="col">Queue</th>
                    <th scope="col">View</th>
                </tr>
            </thead>
            <tbody>
                <tr :foreach="(index, cifra) in _cifras">
                    <th scope="row">{index + 1}</th>
                    <td><a :href="#{URL.ROUTE_EDIT_CIFRA.to(cifra.id)}">{cifra.titulo}</a></td>
                    <td>{cifra.versao}</td>
                    <td>{cifra.tonalidade}</td>
                    <td>
                        <div class="form-check form-switch">
                            <input @change="_changeQueue($value, cifra)" class="form-check-input" type="checkbox" :id="cifra-{cifra.id}">
                        </div>
                    </td>
                    <td><a target="_blank" :href="https://preview.atosmusic.com.br/?id={cifra.id}">View</a></td>
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

    async _loadQueue() {
        const queue = await QueueModel.create().get();
        for (let i = 0; i < queue.cifras.length; i++) {
            this.$element.find(`#cifra-${queue.cifras[i].id}`).prop('checked', true);
        }
    }

    _changeQueue(enable, cifra) {
        const queue = new QueueModel();
        if (enable) {
            queue.add(cifra);
        } else {
            queue.remove(cifra);
        }
    }

    _loadcifras() {
        (new CifraModel()).all().then(cifras => {
            this.setCifras(cifras);
            this._loadQueue();
        });
    }
};