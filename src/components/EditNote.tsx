// import React, { useState, useEffect } from "react";
// import { updateNote } from "../api";
// import "../styles/EditNote.css"; // Import the CSS file

// const EditNote: React.FC<{ noteId: number }> = ({ noteId }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isPublic, setIsPublic] = useState(false);

//   useEffect(() => {
//     // Fetch note data (placeholder)
//     const fetchNote = async () => {
//       // Replace with actual getNote API call
//       const note = {
//         id: noteId,
//         title: "Test",
//         content: "Test Content",
//         isPublic: true,
//         createdBy: "user",
//       };
//       setTitle(note.title);
//       setContent(note.content);
//       setIsPublic(note.isPublic);
//     };
//     fetchNote();
//   }, [noteId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const updatedNote = await updateNote(noteId, {
//         title,
//         content,
//         isPublic,
//       });
//       console.log("Note updated:", updatedNote);
//     } catch (error) {
//       console.error("Error updating note:", error);
//     }
//   };

//   return (
//     <div className="edit-note-container">
//       <h2>Edit Note</h2>
//       <form onSubmit={handleSubmit} className="edit-note-form">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter Note Title"
//         />
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Enter Note Content"
//         />
//         <label>
//           <input
//             type="checkbox"
//             checked={isPublic}
//             onChange={(e) => setIsPublic(e.target.checked)}
//           />
//           Public
//         </label>
//         <button type="submit" className="update-btn">
//           Update
//         </button>
//         <button type="button" className="cancel-btn">
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditNote;
