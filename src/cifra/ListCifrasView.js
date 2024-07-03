import PiComponent from 'pyllar/component';

import MusicaModel from '../musica/MusicaModel';

export default class ListCifrasView extends PiComponent {
    view = /*html*/`<div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Versão</th>
                    <th scope="col">Criado Por</th>
                </tr>
            </thead>
            <tbody>
                <tr :foreach="(index, musica) in _musicas">
                    <th scope="row">{index + 1}</th>
                    <td><a :href="#{URL.ROUTE_EDIT_CIFRA.to(musica.id)}">{musica.titulo}</a></td>
                    <td>{musica.versao}</td>
                    <td>@necojr</td>
                </tr>
            </tbody>
        </table>
    </div>`;

    _musicas = [];

    viewDidLoad() {
        this._loadMusicas();
    }

    setMusicas(musicas) {
        this._musicas.clear().load(musicas);
    }

    _loadMusicas() {
        (new MusicaModel()).all().then(musicas => {
            this.setMusicas(musicas);
        });
    }
};