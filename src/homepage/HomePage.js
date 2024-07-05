import PiComponent from 'pyllar/component';
import PiConfig from 'pyllar/config';

import "../routes";
import "./HomePage.css";

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
                </ul>
            </div>

            <div id="view"></div>
        </div>
    </div>`;

    instances() {
        
    }

    viewDidLoad() {
        
    }

    setView(view) {
        view.render(this.$element.find('#view'));
    }
}