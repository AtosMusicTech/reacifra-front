export default class Marcador {

    constructor($marcador) {
        this.$marcador = $marcador;
        this.note = null;
    }

    move(note) {
        const position = note.position();
        const w = note.width();
        const h = note.height();

        this.$marcador.css('top', position.top - 2).css('left', position.left - 7);
        this.$marcador.css('width', w + 13).css('height', h + 4);

        note.save();
        setTimeout(() => {
            note.highlight();
        }, 200);

        if (this.note) {
            this.note.restore();
        }

        this.note = note;

        setTimeout(() => {
            this._moveScroll();
        }, 200);
    }

    _moveScroll() {
        const rect = this.$marcador.get(0).getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
            window.scrollBy(0, rect.bottom - window.innerHeight + 100);
          } else if (rect.top < 0) {
            window.scrollBy(0, rect.top);
          }
    }
};