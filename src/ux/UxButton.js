import PiComponent from 'pyllar/component';

export default class UxButton extends PiComponent {
    view = /*html*/`<button type="submit" :class="{classes}" @click="click($event)">{@label}</button>`;

    instances() {
        this._lock = false;
        this.label = "UxButton";
        this.classes = 'btn btn-filled';
        this.loadingLabel = 'Aguarde ...';
    }

    lock() {
        this._label = this.label;
        this.label = this.loadingLabel;
        this._lock = true;
    }

    unlock() {
        this.label = this._label;
        this._lock = false;
    }

    click(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this._lock) {
            return;
        }

        this.lock();
        this.dispatchEvent("click");
    }
};

PiComponent.register(UxButton);