import axios from 'axios';
import { keycloakInstance } from './Keycloak';
import api from "../src/appBase"; // Adjust the import path as necessary

// Note interface
export interface Note {
  id: number | null;
  title: string;
  content: string;
  isPublic: boolean;
  createdBy: string;
}

// Create a new note
// export const createNote = async (title: string, content: string): Promise<Note> => {
//   const response = await api.post('/user/create_note', { title, content });
//   return response.data;
// };

// Get all notes
// export const getNote = async (noteId: number): Promise<Note[]> => {
//   const response = await api.get('/user/view_note/');
//   return response.data;
// };

// Update a note by ID
// export const updateNote = async (id: number, note: Partial<Note>): Promise<Note> => {
//   const response = await api.put(`/user/edit_note/${id}`, note);
//   return response.data;
// };

// Delete a note by ID
// export const deleteNote = async (id: number): Promise<void> => {
//   await api.delete(`/user/delete_note/${id}`);
// };

// Search public notes
// export const searchNotes = async (query: string): Promise<Note[]> => {
//   const response = await api.get(`/notes/search?q=${query}`);
//   return response.data;
// };
