const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default new class Transposicao {
    up(note) {
        return this.transpose(note, 1);
    }

    down(note) {
        return this.transpose(note, -1);
    }

    transpose(note, steps) {
        // Encontra o índice da nota inicial no array de notas
        const index = NOTES.indexOf(note.toUpperCase());

        // Verifica se a nota fornecida é válida
        if (index === -1) {
            throw new Error('Nota inválida fornecida.');
        }

        // Calcula o novo índice após transposição
        let newIndex = (index + steps) % NOTES.length;

        // Ajusta o índice caso ele seja negativo
        if (newIndex < 0) {
            newIndex += NOTES.length;
        }

        // Retorna a nota transposta
        return NOTES[newIndex];
    }
};