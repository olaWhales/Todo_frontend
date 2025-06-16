import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ViewNote.css";

const ViewNote: React.FC = () => {
  const { id } = useParams();
  const [note, setNote] = useState<{ title: string; content: string } | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/notes/${id}`
        );
        setNote(response.data);
      } catch (err: any) {
        setError(
          "Unable to fetch note. You may not have access or it doesn't exist."
        );
        console.error(err);
      }
    };

    if (id) fetchNote();
  }, [id]);

  return (
    <div className="view-note-container">
      {error && <p className="error">{error}</p>}
      {note ? (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </>
      ) : (
        !error && <p>Loading note...</p>
      )}
    </div>
  );
};

export default ViewNote;
