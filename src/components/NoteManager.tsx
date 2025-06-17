// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "../styles/NoteManager.css";

// interface Note {
//   id: number;
//   title: string;
//   content: string;
//   isPublic: boolean;
//   createdBy: string;
// }

// const NoteManager: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [selectedNote, setSelectedNote] = useState<Note | null>(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isPublic, setIsPublic] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   useEffect(() => {
//     if (id) {
//       fetchNote(parseInt(id));
//     } else {
//       setSelectedNote(null);
//       setTitle("");
//       setContent("");
//       setIsPublic(false);
//       setIsEditing(false);
//     }
//   }, [id]);

//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get<Note[]>(
//         "http://localhost:8080/api/notes"
//       );
//       setNotes(response.data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   const fetchNote = async (noteId: number) => {
//     try {
//       const response = await axios.get<Note>(
//         `http://localhost:8080/api/notes/${noteId}`
//       );
//       const note = response.data;
//       setSelectedNote(note);
//       setTitle(note.title);
//       setContent(note.content);
//       setIsPublic(note.isPublic);
//       setIsEditing(false); // Default to view mode
//     } catch (error) {
//       console.error("Error fetching note:", error);
//     }
//   };

//   const handleCreate = async () => {
//     try {
//       await axios.post<Note>("http://localhost:8080/api/notes", {
//         title,
//         content,
//         isPublic,
//       });
//       setMessage("Note created!");
//       setTitle("");
//       setContent("");
//       setIsPublic(false);
//       fetchNotes();
//       setTimeout(() => setMessage(""), 2000);
//     } catch (error) {
//       setMessage("Failed to create note.");
//       console.error("Error creating note:", error);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!id) return;
//     try {
//       await axios.put<Note>(`http://localhost:8080/api/notes/${id}`, {
//         title,
//         content,
//         isPublic,
//       });
//       setMessage("Note updated!");
//       fetchNote(parseInt(id));
//       setIsEditing(false); // Return to view mode after update
//       setTimeout(() => setMessage(""), 2000);
//     } catch (error) {
//       setMessage("Failed to update note.");
//       console.error("Error updating note:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!id || !window.confirm("Delete this note?")) return;
//     try {
//       await axios.delete(`http://localhost:8080/api/notes/${id}`);
//       setMessage("Note deleted!");
//       setSelectedNote(null);
//       setTitle("");
//       setContent("");
//       setIsPublic(false);
//       setIsEditing(false);
//       fetchNotes();
//       navigate("/notes");
//       setTimeout(() => setMessage(""), 2000);
//     } catch (error) {
//       setMessage("Failed to delete note.");
//       console.error("Error deleting note:", error);
//     }
//   };

//   return (
//     <div className="note-manager">
//       <div className="sidebar">
//         <h2>Notes</h2>
//         <button
//           onClick={() => {
//             setSelectedNote(null);
//             setTitle("");
//             setContent("");
//             setIsPublic(false);
//             setIsEditing(false);
//           }}
//           className="new-note-btn"
//         >
//           New Note
//         </button>
//         {notes.map((note) => (
//           <div
//             key={note.id}
//             className="note-item"
//             onClick={() => {
//               fetchNote(note.id);
//               navigate(`/notes/${note.id}`);
//             }}
//           >
//             {note.title}
//           </div>
//         ))}
//       </div>
//       <div className="main-panel">
//         <h1>
//           {!selectedNote
//             ? "Create Note"
//             : isEditing
//             ? "Edit Note"
//             : "View Note"}
//         </h1>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="note-input"
//           disabled={!isEditing && selectedNote !== null}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="note-textarea"
//           disabled={!isEditing && selectedNote !== null}
//         />
//         <label>
//           <input
//             type="checkbox"
//             checked={isPublic}
//             onChange={(e) => setIsPublic(e.target.checked)}
//             disabled={!isEditing && selectedNote !== null}
//           />
//           Make Public
//         </label>
//         {selectedNote ? (
//           <div className="action-buttons">
//             {!isEditing ? (
//               <>
//                 <button onClick={() => setIsEditing(true)} className="edit-btn">
//                   Edit
//                 </button>
//                 <button onClick={handleDelete} className="delete-btn">
//                   Delete
//                 </button>
//               </>
//             ) : (
//               <button onClick={handleUpdate} className="save-btn">
//                 Save
//               </button>
//             )}
//           </div>
//         ) : (
//           <button onClick={handleCreate} className="save-btn">
//             Create
//           </button>
//         )}
//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default NoteManager;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import "../styles/NoteManager.css";

interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
  createdBy: string;
}

const NoteManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authenticated, token } = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (authenticated) {
      fetchNotes();
    }
  }, [authenticated]);

  useEffect(() => {
    if (id && authenticated) {
      fetchNote(parseInt(id));
    } else {
      setSelectedNote(null);
      setTitle("");
      setContent("");
      setIsPublic(false);
      setIsEditing(false);
    }
  }, [id, authenticated]);

  const fetchNotes = async () => {
    if (!token) return;
    try {
      const response = await axios.get<Note[]>(
        "http://localhost:8081/user/notes", // Updated endpoint
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setMessage("Failed to load notes. Please ensure you're logged in.");
    }
  };

  const fetchNote = async (noteId: number) => {
    if (!token) return;
    try {
      const response = await axios.get<Note>(
        `http://localhost:8081/user/view_note/${noteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const note = response.data;
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
      setIsPublic(note.isPublic);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching note:", error);
      setMessage("Failed to load note.");
    }
  };

  const handleCreate = async () => {
    if (!token) return;
    try {
      const response = await axios.post<Note>(
        "http://localhost:8081/user/create_note/",
        { title, content }, // Removed isPublic
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Note created!");
      setTitle("");
      setContent("");
      setIsPublic(false);
      fetchNotes();
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Failed to create note. Please check permissions.");
      console.error("Error creating note:", error);
    }
  };

  const handleUpdate = async () => {
    if (!id || !token) return;
    try {
      await axios.put<Note>(
        `http://localhost:8081/user/edit_note/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Note updated!");
      fetchNote(parseInt(id));
      setIsEditing(false);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Failed to update note.");
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async () => {
    if (!id || !token || !window.confirm("Delete this note?")) return;
    try {
      await axios.delete(`http://localhost:8081/user/delete_note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Note deleted!");
      setSelectedNote(null);
      setTitle("");
      setContent("");
      setIsPublic(false);
      setIsEditing(false);
      fetchNotes();
      navigate("/notes");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Failed to delete note.");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="note-manager">
      <div className="sidebar">
        <h2>Notes</h2>
        <button
          onClick={() => {
            setSelectedNote(null);
            setTitle("");
            setContent("");
            setIsPublic(false);
            setIsEditing(false);
          }}
          className="new-note-btn"
          disabled={!authenticated}
        >
          New Note
        </button>
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            onClick={() => {
              fetchNote(note.id);
              navigate(`/notes/${note.id}`);
            }}
            style={{
              cursor: authenticated ? "pointer" : "not-allowed",
              opacity: authenticated ? 1 : 0.5,
            }}
          >
            {note.title}
          </div>
        ))}
      </div>
      <div className="main-panel">
        <h1>
          {!selectedNote
            ? "Create Note"
            : isEditing
            ? "Edit Note"
            : "View Note"}
        </h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"
          disabled={(!isEditing && selectedNote !== null) || !authenticated}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-textarea"
          disabled={(!isEditing && selectedNote !== null) || !authenticated}
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            disabled={(!isEditing && selectedNote !== null) || !authenticated}
          />
          Make Public
        </label>
        {selectedNote ? (
          <div className="action-buttons">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-btn"
                  disabled={!authenticated}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="delete-btn"
                  disabled={!authenticated}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleUpdate}
                className="save-btn"
                disabled={!authenticated}
              >
                Save
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={handleCreate}
            className="save-btn"
            disabled={!authenticated}
          >
            Create
          </button>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NoteManager;