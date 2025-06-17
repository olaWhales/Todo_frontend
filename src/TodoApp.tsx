import React from "react";
import { useNavigate } from "react-router-dom";
import { keycloakInstance } from "../src/Keycloak";
import { useAuth } from "./App";
import Homepage from "../src/components/Homepage";

const TodoApp: React.FC = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    keycloakInstance.logout();
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <p>Welcome, {userInfo?.name || "User"}!</p>
      <button onClick={handleLogout}>Logout</button>
      <Homepage />
      {/* <CreateNote />
      <EditNote noteId={1} />
      <DeleteNote noteId={1} onDelete={() => console.log("Note deleted")} />
      <ViewNote noteId={1} /> */}
    </div>
  );
};

export default TodoApp;
