import type { Note } from "../App"

type NoteProps = {
    note: Note,
    onNoteChange?: (note: Note)=> void,
    onNoteRemove?: (note: Note)=> void,
}

export default function Note({note, onNoteChange, onNoteRemove}: NoteProps) {
    const handleNoteInput = (event: React.InputEvent<HTMLInputElement>, note: Note) => {
        const text = event.currentTarget.value;        
        note = {...note, text};

        onNoteChange?.(note);
    }

    const handleNoteRemove = (note: Note) => {
        onNoteRemove?.(note);
    }

    return (
        <div className="note-border">
            <span>{new Date(note.date).toLocaleString()}</span>
            <input type="text" value={note.text} onInput={(event) => handleNoteInput(event, note)} />
            <button type="button" onClick={() => handleNoteRemove(note)}>Remove</button>
        </div>
    )
}