import Note from "./Note";

export default class NotesCollection extends Array {
    constructor($notes) {
        super();

        $notes.get().forEach((note, index) => {
            this.push(new Note($(note)));
        });
    }

    getNoteByPosition(p) {
        return this[p + 1];
    }
};