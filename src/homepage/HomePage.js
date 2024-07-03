import PiComponent from 'pyllar/component';
import PiConfig from 'pyllar/config';

import CifraView from '../cifra/CifraView';
import CifraStream from '../cifra/CifraStream';

import EditCifraView from '../cifra/EditCifraView';
import "../routes";

import TransporteModel from '../transporte/TransporteModel';

import "./HomePage.css";
import PreviewCifraView from '../cifra/PreviewCifraView';

export default class HomePage extends PiComponent {
    view = /*html*/`<div class="container homepage">
        <div class="content">
            <div class="menu" id="menu">
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link active" :href="#{URL.ROUTE_NEW_CIFRA.HASH}">Nova</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="#{URL.ROUTE_LIST_CIFRA.HASH}">Pesquisar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href="#{URL.ROUTE_PREVIEW_CIFRA.HASH}">Preview</a>
                    </li>
                </ul>
            </div>

            <div id="view"></div>
        </div>
    </div>`;

    instances() {
        this.cifraStream = new CifraStream(PiConfig.get('cifraStream'));
    }

    viewDidLoad() {
        this.cifraStream.connect();

        this._loadTransporte();
        this._loadEvents();
    }

    setView(view) {
        view.render(this.$element.find('#view'));
    }

    _loadTransporte() {
        (new TransporteModel()).get().then((transporte) => {
            if (transporte == null) {
                // this.setView(new PreviewCifraView());
                return;
            }

            if (transporte.musicaId == 0) {
                // this.setView(new PreviewCifraView());
                return;
            }

            const cifraView = new CifraView();
            this.setView(cifraView);
            this.hideMenu();
            cifraView.loadMusica(transporte.musicaId, () => {
                cifraView.setMarcadorPosicao(transporte.posicao);
                cifraView.setMarcadorPosicao(40);
            });
        });
    }

    showMenu(){
        this.$element.find('#menu').show();
    }

    hideMenu(){
        this.$element.find('#menu').hide();
    }

    _loadEvents() {
        this.cifraStream.onNewMusica(musica => {
            const cifraView = new CifraView();
            this.setView(cifraView);
            cifraView.setStream(this.cifraStream);
            cifraView.setMusica(musica);
            this.hideMenu();
        });
    }
}