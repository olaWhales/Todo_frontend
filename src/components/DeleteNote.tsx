import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/DeleteNote.css";

const DeleteNote: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteNote = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/notes/${id}`);
        alert("Note deleted successfully.");
        navigate("/view-all-notes"); // Adjust route based on your app
      } catch (error) {
        alert("Failed to delete the note. Make sure you are authorized.");
        console.error(error);
      }
    };

    if (id) deleteNote();
  }, [id, navigate]);

  return (
    <div className="delete-note-container">
      <p>Deleting note...</p>
    </div>
  );
};

export default DeleteNote;
