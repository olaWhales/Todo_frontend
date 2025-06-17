// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/ViewAllNotes.css";

// const ViewAllNotes: React.FC<{ onNoteSelect: (id: number) => void }> = ({
//   onNoteSelect,
// }) => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/notes")
//       .then((res) => setNotes(res.data))
//       .catch((err) => console.error("Error fetching notes:", err));
//   }, []);

//   return (
//     <div className="note-list">
//       <h2>All Notes</h2>
//       {notes.map((note: any) => (
//         <div
//           key={note.id}
//           className="note-card"
//           onClick={() => onNoteSelect(note.id)}
//         >
//           <h4>{note.title}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewAllNotes;
