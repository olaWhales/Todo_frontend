// import React, { useState, useEffect } from 'react';
// import { getNote } from '../api';
// import '../styles/ViewNote.css';

// const ViewNote: React.FC<{ noteId: number }> = ({ noteId }) => {
//   const [note, setNote] = useState<{ id: number | null; title: string; content: string; isPublic: boolean; createdBy: string } | null>(null);

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const fetchedNotes = await getNote(noteId);
//         const fetchedNote = Array.isArray(fetchedNotes) ? fetchedNotes[0] : fetchedNotes;
//         setNote(fetchedNote);
//       } catch (error) {
//         console.error('Error fetching note:', error);
//       }
//     };
//     fetchNote();
//   }, [noteId]);

//   if (!note) {
//     return <div className="view-note-container">Loading...</div>;
//   }

//   return (
//     <div className="view-note-container">
//       <h2>View Note</h2>
//       <div className="view-note-details">
//         <p className="title">{note.title}</p>
//         <p className="content">{note.content}</p>
//         <p>Public: {note.isPublic ? 'Yes' : 'No'}</p>
//         <p>Created By: {note.createdBy}</p>
//       </div>
//     </div>
//   );
// };

// export default ViewNote;