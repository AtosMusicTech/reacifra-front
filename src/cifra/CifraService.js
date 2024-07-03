import { app } from "pyllar/env";
import { global } from "pyllar/env";
import PiService from "pyllar/service";
import PiUrlHash from "pyllar/url_hash";

import HomePage from "../homepage/HomePage";

import NewCifraView from "./NewCifraView";
import EditCifraView from "./EditCifraView";
import ListCifrasView from "./ListCifrasView";
import PreviewCifraView from "./PreviewCifraView";

import { ROUTE_PREVIEW_CIFRA, ROUTE_NEW_CIFRA, ROUTE_EDIT_CIFRA, ROUTE_LIST_CIFRA } from "../routes";

export default class CifraService extends PiService {
    init() {
        super.init();
        this
            .addRoute(ROUTE_NEW_CIFRA.HASH, this.newCifra)
            .addRoute(ROUTE_EDIT_CIFRA.HASH, this.editCifra)
            .addRoute(ROUTE_LIST_CIFRA.HASH, this.listCifra)
            .addRoute(ROUTE_PREVIEW_CIFRA.HASH, this.previewCifra);
    }

    newCifra() {
        this._createHomePage(new NewCifraView());
    }

    editCifra(id) {
        const edit = new EditCifraView();
        this._createHomePage(edit);
        edit.loadMusica(id);
    }

    listCifra() {
        this._createHomePage(new ListCifrasView());
    }

    previewCifra() {
        this._createHomePage(new PreviewCifraView());
    }

    _createHomePage(view) {
        const homepage = new HomePage();

        homepage.render(global.app.$element);
        homepage.setView(view);

        return homepage;
    }

};