import { global } from "pyllar/env";
import Bootstrap from "pyllar/bootstrap";
import PiConfig from "pyllar/config";

import HomePage from "./homepage/HomePage";
import CifraService from "./cifra/CifraService";

import "./app.css"
import CifrasListView from "./cifra/CifrasListView";

if (window.appSettings) {
    PiConfig.load(appSettings);
}

PiConfig.set('request.fetch', function (url, settings, success, error, next) {
    next();
});

new Bootstrap()
    .onLoad((boot) => {
        boot.addServices(new CifraService());
    })
    .onReady((boot) => {
        const homepage = new HomePage();
        homepage.render(global.app.$element);
        homepage.setView(new CifrasListView());
        boot.startServices();
    })
    .load();