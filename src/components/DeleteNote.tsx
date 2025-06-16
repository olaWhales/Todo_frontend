// import React, { useState } from "react";
// import { deleteNote } from "../api";
// import "../styles/DeleteNote.css";

// const DeleteNote: React.FC<{ noteId: number; onDelete: () => void }> = ({
//   noteId,
//   onDelete,
// }) => {
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleDelete = async () => {
//     setShowConfirm(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteNote(noteId);
//       console.log("Note deleted:", noteId);
//       onDelete(); // Callback to refresh the list or close the component
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//     setShowConfirm(false);
//   };

//   const cancelDelete = () => {
//     setShowConfirm(false);
//   };

//   return (
//     <div className="delete-note-container">
//       <h2>Delete Note</h2>
//       {!showConfirm ? (
//         <button className="delete-btn" onClick={handleDelete}>
//           Delete
//         </button>
//       ) : (
//         <div className="delete-note-form">
//           <p>Are you sure you want to delete this note?</p>
//           <button className="delete-btn" onClick={confirmDelete}>
//             Yes
//           </button>
//           <button className="cancel-btn" onClick={cancelDelete}>
//             No
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeleteNote;
