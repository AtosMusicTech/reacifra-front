import { app } from "pyllar/env";
import { global } from "pyllar/env";
import PiService from "pyllar/service";
import PiUrlHash from "pyllar/url_hash";

import HomePage from "../homepage/HomePage";

import CifraNewView from "./CifraNewView";
import CifraEditView from "./CifraEditView";
import CifrasListView from "./CifrasListView";
import PreviewCifraView from "./CifraPreviewView";

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
        this._createHomePage(new CifraNewView());
    }

    editCifra(id) {
        const edit = new CifraEditView();
        this._createHomePage(edit);
        edit.loadCifra(id);
    }

    listCifra() {
        this._createHomePage(new CifrasListView());
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