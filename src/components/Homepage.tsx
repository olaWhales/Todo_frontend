// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Homepage.css";
// import { useNavigate } from "react-router-dom";

// const Homepage: React.FC = () => {
//   const [welcomeNote, setWelcomeNote] = useState<string>("");
//   const [customMessage, setCustomMessage] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedNote = localStorage.getItem("customWelcomeNote");
//     if (savedNote) {
//       setWelcomeNote(savedNote);
//       // Note: customMessage is intentionally not pre-filled to avoid unsaved content persisting
//     }
//   }, []);

//   const handleSaveNote = () => {
//     setWelcomeNote(customMessage);
//     localStorage.setItem("customWelcomeNote", customMessage);
//     setCustomMessage(""); // Clear the input after saving
//   };

//   const handleCreate = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/todos", {
//         title: "New Todo",
//         description: "This is a test todo",
//       });
//       console.log("Create response:", response.data);
//     } catch (error) {
//       console.error("Create error:", error);
//     }
//   };

//   const handleView = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/todos");
//       console.log("View response:", response.data);
//     } catch (error) {
//       console.error("View error:", error);
//     }
//   };

//   const handleNavigateToCreateNote = () => {
//     navigate("notes");
//   };

//   return (
//     <div className="homepage-container">
//       <h1 className="homepage-title">Your Daily Task Companion</h1>

//       <div className="button-group">
//         <button className="rounded-button" onClick={handleNavigateToCreateNote}>
//           Create Note
//         </button>
//         <button className="rounded-button" onClick={handleView}>
//           View
//         </button>
//       </div>

//       <div>
//         <h2 className="welcome-title">Start of Day Message</h2>
//       </div>

//       <div className="down-arrow">⬇️</div>

//       <div className="note-editor">
//         {welcomeNote && <p className="welcome-note">{welcomeNote}</p>}

//         <div
//           className={`textarea-wrapper ${customMessage ? "has-text" : ""}`}
//           data-placeholder="🌈 Write your custom welcome note here..."
//         >
//           <textarea
//             className="note-textarea"
//             aria-label="Custom welcome note"
//             value={customMessage}
//             onChange={(e) => setCustomMessage(e.target.value)}
//             onFocus={(e) =>
//               e.currentTarget.parentElement?.classList.add("focused")
//             }
//             onBlur={(e) =>
//               e.currentTarget.parentElement?.classList.remove("focused")
//             }
//           />
//         </div>

//         <button className="save-button" onClick={handleSaveNote}>
//           Save Welcome Note
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/Homepage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { keycloakInstance } from "../Keycloak";

const Homepage: React.FC = () => {
  const { authenticated, token } = useContext(AuthContext);
  const [welcomeNote, setWelcomeNote] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedNote = localStorage.getItem("customWelcomeNote");
    if (savedNote) {
      setWelcomeNote(savedNote);
    }
  }, []);

  const handleSaveNote = () => {
    setWelcomeNote(customMessage);
    localStorage.setItem("customWelcomeNote", customMessage);
    setCustomMessage("");
  };

  const handleCreate = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        "http://localhost:8081/user/create_note/",
        {
          title: "New Note",
          content: "This is a test note",
          isPublic: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Create response:", response.data);
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  const handleView = async () => {
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:8081/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("View response:", response.data);
    } catch (error) {
      console.error("View error:", error);
    }
  };

  const handleNavigateToCreateNote = () => {
    navigate("/notes");
  };

  const handleLogin = () => {
    keycloakInstance.login({
      redirectUri: window.location.origin + "/homepage",
    });
  };

  const handleSignup = () => {
    keycloakInstance.register({
      redirectUri: window.location.origin + "/homepage",
    });
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Your Daily Task Companion</h1>
      {!authenticated ? (
        <div className="button-group">
          <button className="rounded-button" onClick={handleLogin}>
            Login
          </button>
          <button className="rounded-button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      ) : (
        <div className="button-group">
          <button
            className="rounded-button"
            onClick={handleNavigateToCreateNote}
          >
            Create Note
          </button>
          <button className="rounded-button" onClick={handleView}>
            View
          </button>
        </div>
      )}

      <div>
        <h2 className="welcome-title">Start of Day Message</h2>
      </div>

      <div className="down-arrow">⬇️</div>

      <div className="note-editor">
        {welcomeNote && <p className="welcome-note">{welcomeNote}</p>}

        <div
          className={`textarea-wrapper ${customMessage ? "has-text" : ""}`}
          data-placeholder="🌈 Write your custom welcome note here..."
        >
          <textarea
            className="note-textarea"
            aria-label="Custom welcome note"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            onFocus={(e) =>
              e.currentTarget.parentElement?.classList.add("focused")
            }
            onBlur={(e) =>
              e.currentTarget.parentElement?.classList.remove("focused")
            }
            disabled={!authenticated}
          />
        </div>

        <button
          className="save-button"
          onClick={handleSaveNote}
          disabled={!authenticated}
        >
          Save Welcome Note
        </button>
      </div>
    </div>
  );
};

export default Homepage;