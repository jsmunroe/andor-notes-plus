import type { Note as NoteType } from "../App"
import Note from "./Note";

type NotesListProps = {
    notes: NoteType[],
    onNotesChange?: (notes: NoteType[]) => void,
}

export default function NotesList({notes, onNotesChange}: NotesListProps) {
    const handleNoteChange = (note: NoteType) => {
        const changedNotes = notes.map(n => n.id === note.id ? note : n);

        onNotesChange?.(changedNotes);  
    }
    
    const handleNoteRemove = (note: NoteType) => {
        const changedNotes = notes.filter(n => n.id !== note.id);

        onNotesChange?.(changedNotes);  
    }

    return (
        <>
            {notes.length === 0 && <span>There are no notes here.</span>}
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <Note note={note} onNoteChange={handleNoteChange} onNoteRemove={handleNoteRemove} />
                    </li>
                ))}
            </ul>
        </>
    );
}