import Keycloak from 'keycloak-js';

const keycloakInstance = new Keycloak({
  url: 'https://<your-keycloak-server>/auth',
  realm: '<your-realm>',
  clientId: '<your-client-id>',
});

export interface KeycloakUserInfo {
  name?: string;
  email?: string;
  [key: string]: any;
}

export { keycloakInstance };