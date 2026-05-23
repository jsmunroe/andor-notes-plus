import { createContext, useState } from 'react'
import './App.css'

type Note = {
    id: string,
    date: number, // Consider whether it is important to make this UTC at this level.
    text: string,

}

type AppState = {
    notes: Note[],
}

const AppContext = createContext<AppState | null>(null);

const initialAppContext: AppState = {
    notes: [
        {
            id: crypto.randomUUID(),
            date: new Date(2026, 4, 22, 15, 35, 4).getTime(),
            text: 'This is a note.',    
        },
        {
            id: crypto.randomUUID(),
            date: new Date(2026, 4, 22, 17, 45, 20).getTime(),
            text: 'This is another note.',    
        },
        {
            id: crypto.randomUUID(),
            date: new Date(2026, 4, 22, 18, 15, 15).getTime(),
            text: 'This is yet another note.',    
        },
    ],
}


function App() {
    const [appState, setAppState] = useState(initialAppContext);

    const handleInput = (event: React.InputEvent<HTMLInputElement>, id: string) => {
        const input = event.currentTarget;
        const text = input.value;

        const noteIndex = appState.notes.findIndex(note => note.id === id);

        if (noteIndex === -1) {
            return;
        }

        // TODO: Validate text
        const note = {...appState.notes[noteIndex], text };

        const notes = appState.notes.map((n, index) => index === noteIndex ? note : n);

        setAppState({...appState, notes});
        
    }

    const handleAddNote = () => {
        let { notes } = appState;

        notes = [...notes, {
            id: crypto.randomUUID(),
            date: Date.now(),
            text: '',
        }];

        setAppState({...appState, notes});
    }

    const handleRemoveNote = (noteId: string) => {
        let { notes } = appState;

        notes = notes.filter(n => n.id !== noteId);

        setAppState({...appState, notes});
    }

    return (
        <AppContext.Provider value={appState}>
            <ul>
                {appState?.notes.map((note) => (
                    <li key={note.id}>
                        <div className="note-border">
                            <input type="text" value={note.text} onInput={(event) => handleInput(event, note.id)} />
                            <button type="button" onClick={() => handleRemoveNote(note.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={handleAddNote}>Add Note</button>
        </AppContext.Provider>
    )
}

export default App
