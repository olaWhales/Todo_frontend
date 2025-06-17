// import React, { useState } from "react";
// import "../styles/DeleteNote.css";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const DeleteNote: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/api/notes/${id}`
//       );
//       setMessage(response.data.message);
//       setTimeout(() => navigate("/"), 2000); // Redirect to homepage after deletion
//     } catch (err) {
//       setMessage("Failed to delete note.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="delete-note-container">
//       <h2>Delete This Note?</h2>
//       <button onClick={handleDelete} className="delete-button">
//         Confirm Delete
//       </button>
//       {message && <p className="delete-message">{message}</p>}
//     </div>
//   );
// };

// export default DeleteNote;
