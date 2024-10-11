import axios from 'axios';

  const api = axios.create({
    baseURL: "https://backend-v3ko.onrender.com/api/notes",
    headers: {
        'Content-Type': 'application/json',
    },
  });

  class NoteService {
    static fetchNotes = async (courseName,author) => {
      try {
          const response = await api.get(`/note/${courseName}/${author}`);
          return response.data;
      } catch (error) {
          console.error(error);
          return [];
      }
    };
    static addNote = async (newNote, courseName, author) => {
      const response = await api.post(`/addNote/${courseName}/${author}`, newNote);
      return response.data;
    };

    static updateNote = async (id, updatedNote) => {
      const response = await api.put(`/updateNote/${id}`, updatedNote);
      return response.data;
    };

    static deleteNote = async (id, deleteThread) => {
      await api.delete(`/deleteNote/${id}`, { params: { deleteThread } });
    };
  };

  export default NoteService;