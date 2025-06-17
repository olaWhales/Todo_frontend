// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/ViewNote.css";

// const ViewNote: React.FC<{ noteId: number }> = ({ noteId }) => {
//   const [note, setNote] = useState<any>(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/notes/${noteId}`)
//       .then((res) => setNote(res.data))
//       .catch((err) => console.error("Fetch failed:", err));
//   }, [noteId]);

//   if (!note) return <p>Loading note...</p>;

//   return (
//     <div className="note-view">
//       <div className="note-header">
//         <h3>{note.title}</h3>
//         <div className="dot-menu">
//           <span onClick={() => handleDelete(noteId)}>⋮</span>
//         </div>
//       </div>
//       <p>{note.content}</p>
//     </div>
//   );

//   function handleDelete(id: number) {
//     if (window.confirm("Delete this note?")) {
//       axios
//         .delete(`http://localhost:8080/api/notes/${id}`)
//         .then(() => alert("Deleted!"))
//         .catch((err) => console.error("Delete failed:", err));
//     }
//   }
// };
  
// export default ViewNote;
