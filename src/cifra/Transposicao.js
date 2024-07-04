const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export default new class Transposicao {
    up(note) {
        return this.transpose(note, 1);
    }

    down(note) {
        return this.transpose(note, -1);
    }

    semitones(noteFrom, noteTo){
        return NOTES.indexOf(noteTo) - NOTES.indexOf(noteFrom);
    }

    transposeNote(note, semitones) {
        let notes = note.includes('#') ? notesSharp : notesSharp;
        
        let noteIndex = notes.indexOf(note);
        if (noteIndex === -1) {
            notes = note.includes('b') ? notesSharp : notesSharp;
            noteIndex = notes.indexOf(note);
        }
    
        let newIndex = (noteIndex + semitones + notes.length) % notes.length;
        return notes[newIndex];
    }
    
    transpose(chord, semitones) {
        let parts = chord.split('/');
        let mainChord = parts[0];
        let bassNote = parts[1] ? parts[1] : null;
    
        let root, rest;
        if (mainChord[1] === '#' || mainChord[1] === 'b') {
            root = mainChord.slice(0, 2);
            rest = mainChord.slice(2);
        } else {
            root = mainChord[0];
            rest = mainChord.slice(1);
        }
    
        let newRoot = this.transposeNote(root, semitones);
        let transposedChord = newRoot + rest;
    
        if (bassNote) {
            let newBassNote = this.transposeNote(bassNote, semitones);
            transposedChord += '/' + newBassNote;
        }
    
        return transposedChord;
    }

    // transpose(note, steps) {
    //     // Encontra o índice da nota inicial no array de notas
    //     const notes = note.split('/');
    //     const newNotes = [];

    //     notes.forEach(note => {
    //         const index = NOTES.indexOf(note.toUpperCase());

    //         // Verifica se a nota fornecida é válida
    //         if (index === -1) {
    //             throw new Error(`Nota inválida fornecida. ${note}`);
    //         }

    //         // Calcula o novo índice após transposição
    //         let newIndex = (index + steps) % NOTES.length;

    //         // Ajusta o índice caso ele seja negativo
    //         if (newIndex < 0) {
    //             newIndex += NOTES.length;
    //         }

    //         newNotes.push(NOTES[newIndex]);
    //     });

    //     // Retorna a nota transposta
    //     return newNotes.join('/');
    // }
};