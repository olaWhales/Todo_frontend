import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateNote.css";

const CreateNote: React.FC<{ onNoteCreated?: () => void }> = ({
  onNoteCreated,
}) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isPublic, setIsPublic] = useState(false); // ✅ added

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/notes", {
        title: noteTitle,
        content: noteContent,
        public: isPublic, // ✅ send "public" in the payload
      });
      alert("Note created!");
      if (onNoteCreated) onNoteCreated();
      setNoteTitle("");
      setNoteContent("");
      setIsPublic(false); // reset checkbox
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <div className="create-note-container">
      <h1>Create a New Note</h1>
      <input
        type="text"
        placeholder="Note title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        className="note-title-input"
      />
      <textarea
        placeholder="Write your note here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="note-textarea"
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Make this note public
      </label>
      <button onClick={handleSubmit} className="submit-button">
        Save Note
      </button>
    </div>
  );
};

export default CreateNote;
