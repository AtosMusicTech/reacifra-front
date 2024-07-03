export default class Note {
    constructor($note) {
        this.$note = $note;
    }

    highlight() {
        this.$note.css('color', 'white');
    }

    restore() {
        this.$note.css('color', this.$note.attr('data-color'));
    }

    save() {
        this.$note.attr('data-color', this.$note.css('color'));
    }

    position() {
        return this.$note.position();
    }

    width() {
        return this.$note.width();
    }

    height() {
        return this.$note.height();
    }

    get $element() {
        return this.$note;
    }
};