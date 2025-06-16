import { keycloakInstance } from "../src/Keycloak";

export const useAuth = () => {
  return {
    isAuthenticated: !!keycloakInstance?.token,
    username: keycloakInstance?.tokenParsed?.preferred_username ?? "Guest",
    roles: keycloakInstance?.realmAccess?.roles ?? [],
  };
};


// // Usage example in a component --- this is to prevent keyclock to disturb pages and i should delete when done