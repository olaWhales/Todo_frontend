import Keycloak from "keycloak-js";

export const keycloakInstance = new Keycloak({
  url: "http://localhost:8080", // Update to your Keycloak server URL if different
  realm: "Olawale",
  clientId: "todoApp",
  redirectUri: window.location.origin + "/homepage", // Redirect to homepage after login
});

let alreadyInitialized = false;
export const DISABLE_KEYCLOAK = process.env.NODE_ENV === "development"; // Toggle based on environment

export const initKeycloak = (
  onSuccess: (auth: boolean) => void,
  onError: (err: unknown) => void
) => {
  if (DISABLE_KEYCLOAK) {
    console.log("Keycloak init skipped (dev mode)");
    onSuccess(true); // Bypass auth in dev mode
    return;
  }

  if (!alreadyInitialized) {
    alreadyInitialized = true;
    keycloakInstance
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated) {
          console.log("User is authenticated");
          onSuccess(true);
        } else {
          console.log("User is not authenticated");
          onError(new Error("Not authenticated"));
        }
      })
      .catch(onError);
  } else {
    console.log("Keycloak already initialized.");
    onSuccess(keycloakInstance.authenticated || false);
  }
};