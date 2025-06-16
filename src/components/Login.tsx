// import React from "react";
// import { keycloakInstance } from "../Keycloak";

// const Login: React.FC = () => {
//   const handleLogin = () => {
//     keycloakInstance.login();
//   };

//   const handleRegister = () => {
//     keycloakInstance.register();
//   };

//   return (
//     <div>
//       <h2>Login or Register</h2>
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import { keycloakInstance, DISABLE_KEYCLOAK } from "../Keycloak";

const Login: React.FC = () => {
  const handleLogin = () => {
    if (!DISABLE_KEYCLOAK) keycloakInstance.login();
    else alert("Login disabled in dev mode");
  };

  const handleRegister = () => {
    if (!DISABLE_KEYCLOAK) keycloakInstance.register();
    else alert("Register disabled in dev mode");
  };

  return (
    <div>
      <h2>Login or Register</h2>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Login;
