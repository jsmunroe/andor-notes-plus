import { createContext, useState } from 'react'
import './App.css'
import Note from './components/Note';
import NotesList from './components/NotesList';

export type Note = {
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

    const handleAddNote = () => {
        let { notes } = appState;

        notes = [...notes, {
            id: crypto.randomUUID(),
            // eslint-disable-next-line react-hooks/purity
            date: Date.now(),
            text: '',
        }];

        handleNotesChange(notes);
    }

    const handleNotesChange = (notes: Note[]) => {
        setAppState({...appState, notes});
    }

    return (
        <AppContext.Provider value={appState}>
            <div className="app">
                <h2>Andor Health Notes +</h2>

                <NotesList notes={appState.notes} onNotesChange={handleNotesChange} />
                <button type="button" onClick={handleAddNote}>Add Note</button>
            </div>
        </AppContext.Provider>
    )
}

export default App
