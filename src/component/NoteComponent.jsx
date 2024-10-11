import React, { useState, useEffect } from 'react';
import NoteService from '../services/noteServices';
import styles from './css/NoteComponent.module.css';

const NoteComponent = ({ courseName, currentUser }) => {
    const [noteContent, setNoteContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
  
    useEffect(() => {
      fetchNotes();
    }, []);
  
    const fetchNotes = async () => {
      const fetchedNotes = await NoteService.fetchNotes(courseName, currentUser);
      setNotes(fetchedNotes);
    };
  
    const handleAddNote = async () => {
      if (noteContent.trim()) {
        const newNote = await NoteService.addNote({ noteContent }, courseName, currentUser);
        setNotes([...notes, newNote]);
        setNoteContent('');
      }
    };
  
    const handleSaveNote = async (id, content) => {
        const updatedNote = await NoteService.updateNote(id, { noteContent: content });
        setNotes(notes.map(note => note.id === id ? updatedNote : note));
        setEditingNoteId(null);
      };
  
    const handleDeleteNote = async (id) => {
      await NoteService.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    };
  
    return (
      <div className={styles.noteComponent}>
        <h3>Course Notes</h3>
        <div className={styles.addNoteForm}>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a new note..."
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
        <div className={styles.noteList}>
        {notes.map(note => (
          <div key={note.id} className={styles.noteItem}>
            {editingNoteId === note.id ? (
              <>
                <textarea
                className={styles.noteTextarea}
                value={note.noteContent}
                onChange={(e) => setNotes(notes.map(n => n.id === note.id ? {...n, noteContent: e.target.value} : n))}
                />
                <button className={styles.saveButton} onClick={() => handleSaveNote(note.id, note.noteContent)}>Save</button>
                <button className={styles.cancelButton} onClick={() => setEditingNoteId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{note.noteContent}</p>
                <small>By: {note.author}</small>
                <button className={styles.editButton} onClick={() => setEditingNoteId(note.id)}>Edit</button>
                <button className={styles.deleteButton} onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      </div>
    );
  };
  
export default NoteComponent;