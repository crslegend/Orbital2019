import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  client_id: 'http://specs.openid.net/auth/2.0',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'token id_token',
  scope: 'openid',
  authority: "https://openid.nus.edu.sg/",
  metadata: {
    issuer: "http://specs.openid.net/auth/2.0/identifier_select",
    jwks_uri: "https://openid.nus.edu.sg" + "/.well-known/openid-configuration/jwks",
    authorization_endpoint: "https://openid.nus.edu.sg" + "/auth/index?openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.ax=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.sreg.optional=postcode%2Cnickname&openid.sreg.required=email%2Cfullname&controller=server&action=index&module=default",
  }
};

const userManager = createUserManager(userManagerConfig);

export default userManager;