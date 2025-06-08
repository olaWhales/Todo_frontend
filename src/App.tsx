import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { keycloakInstance as keycloak, KeycloakUserInfo } from './keycloak';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return keycloak.authenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<KeycloakUserInfo | null>(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then((auth) => {
        setAuthenticated(auth);
        if (auth) {
          keycloak.loadUserInfo().then((info) => setUserInfo(info as KeycloakUserInfo));
        }
      })
      .catch((error) => console.error('Keycloak initialization failed', error));
  }, []);

  const handleLogin = () => keycloak.login();
  const handleLogout = () => keycloak.logout();
  const handleRegister = () => keycloak.register();

  if (!authenticated) {
    return (
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<div><button onClick={handleLogin}>Login</button><button onClick={handleRegister}>Register</button></div>} />
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <div>
                <h1>Todo Application</h1>
                <p>Welcome, {userInfo?.name || 'User'}!</p>
                <button onClick={handleLogout}>Logout</button>
                {/* Add your todo components here */}
              </div>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;