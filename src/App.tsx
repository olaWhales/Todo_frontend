// import React, { useState, useEffect, createContext, useContext } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { keycloakInstance, initKeycloak, DISABLE_KEYCLOAK } from "./Keycloak";
// import Login from "./components/Login";
// import TodoApp from "./TodoApp";
// import Homepage from "./components/Homepage";
// // import CreateNote from "./components/CreateNote";
// // import NoteDetails from "./components/NoteDetails";
// import NoteManager from "./components/NoteManager";
// interface AuthContextProps {
//   authenticated: boolean;
//   userInfo: any | null;
// }

// const AuthContext = createContext<AuthContextProps>({
//   authenticated: false,
//   userInfo: null,
// });

// export const useAuth = () => useContext(AuthContext);

// const App: React.FC = () => {
//   const [authenticated, setAuthenticated] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);

//   useEffect(() => {
//     initKeycloak(
//       (auth) => {
//         setAuthenticated(auth);
//         if (auth && !DISABLE_KEYCLOAK) {
//           keycloakInstance.loadUserInfo().then((info) => setUserInfo(info));
//         }
//       },
//       () => setAuthenticated(false)
//     );

//     if (!DISABLE_KEYCLOAK) {
//       const refreshInterval = setInterval(() => {
//         keycloakInstance.updateToken(70).catch(() => keycloakInstance.logout());
//       }, 60000);

//       return () => clearInterval(refreshInterval);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ authenticated, userInfo }}>
//       <Router>
//         <Routes>
//           <Route path="/homepage" element={<Homepage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Homepage />} />
//           <Route path="/notes" element={<NoteManager />} />
//           <Route path="/notes/:id" element={<NoteManager />} />
//           <Route path="/notes" element={<NoteManager />} />
//           <Route
//             path="/todo"
//             element={authenticated ? <TodoApp /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="*"
//             element={<Navigate to={authenticated ? "/todo" : "/login"} />}
//           />
//         </Routes>
//       </Router>
//     </AuthContext.Provider>
//   );
// };

// export default App;


import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { keycloakInstance, initKeycloak, DISABLE_KEYCLOAK } from "./Keycloak";
import Login from "./components/Login";
import TodoApp from "./TodoApp";
import Homepage from "./components/Homepage";
import NoteManager from "./components/NoteManager";

export const AuthContext = createContext<{
  authenticated: boolean;
  userInfo: any | null;
  token?: string | null;
}>({
  authenticated: false,
  userInfo: null,
  token: null,
});

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    initKeycloak(
      (auth) => {
        setAuthenticated(auth);
        if (auth && !DISABLE_KEYCLOAK) {
          keycloakInstance.loadUserInfo().then((info) => setUserInfo(info));
          // Ensure token is defined before setting
          if (keycloakInstance.token) {
            setToken(keycloakInstance.token);
          } else {
            setToken(null);
          }
        } else {
          setToken(null);
          setUserInfo(null);
        }
      },
      (err) => {
        console.error("Keycloak initialization error:", err);
        setAuthenticated(false);
        setToken(null);
      }
    );

    if (!DISABLE_KEYCLOAK) {
      const refreshInterval = setInterval(() => {
        keycloakInstance
          .updateToken(70)
          .then((refreshed) => {
            if (refreshed && keycloakInstance.token) {
              setToken(keycloakInstance.token);
              keycloakInstance.loadUserInfo().then(setUserInfo);
            }
          })
          .catch(() => keycloakInstance.logout());
      }, 60000);

      return () => clearInterval(refreshInterval);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, userInfo, token }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/homepage"
            element={authenticated ? <Homepage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/*"
            element={authenticated ? <NoteManager /> : <Navigate to="/login" />}
          />
          <Route
            path="/todo"
            element={authenticated ? <TodoApp /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={authenticated ? "/homepage" : "/login"} />}
          />
          <Route
            path="*"
            element={<Navigate to={authenticated ? "/homepage" : "/login"} />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;