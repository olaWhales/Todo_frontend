import Keycloak from "keycloak-js";

export const keycloakInstance = new Keycloak({
  url: "http://localhost:8080",
  realm: "Olawale",
  clientId: "todoApp",
});

let alreadyInitialized = false;
// const DISABLE_KEYCLOAK = true; // ⬅️ Add this toggle

export const initKeycloak = (
  onSuccess: (auth: boolean) => void,
  onError: (err: unknown) => void
) => {
  if (DISABLE_KEYCLOAK) {
    console.log("Keycloak init skipped (dev mode)");
    onSuccess(true); // just continue without auth
    return;
  }

  if (!alreadyInitialized) {
    alreadyInitialized = true;
    keycloakInstance
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then(onSuccess)
      .catch(onError);
  } else {
    console.log("Keycloak already initialized.");
  }
};
export const DISABLE_KEYCLOAK = true; // <-- already exists, just export it
