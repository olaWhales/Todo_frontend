import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditNote.css";
import { useParams, useNavigate } from "react-router-dom";

const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/notes/${id}`
        );
        setNoteTitle(response.data.title);
        setNoteContent(response.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/notes/${id}`, {
        title: noteTitle,
        content: noteContent,
      });
      alert("Note updated!");
      navigate("/"); // Redirect to home or list
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="edit-note-container">
      <h1>Edit Note</h1>
      <input
        type="text"
        placeholder="Note title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        className="note-title-input"
      />
      <textarea
        placeholder="Note content"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="note-textarea"
      />
      <button onClick={handleUpdate} className="submit-button">
        Update Note
      </button>
    </div>
  );
};

export default EditNote;
