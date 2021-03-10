declare interface OktaSignInOptions {
  baseUrl: string;
  clientId: string;
  redirectUri: string;

  idps?: { type: string, id: string }[];
  idpDisplay?: 'PRIMARY' | 'SECONDARY';
  oAuthTimeout?: number;

  authParams?: AuthParams;

  logo?: string;
  logoText?: string;
  helpSupportNumber?: string;
  brandName?: string;
  username?: string;
  transformUsername?: (username: string, operation: 'PRIMARY_AUTH' | 'UNLOCK_ACCOUNT') => string;
  processCreds?: (creds: { username: string, password: string }, callback: () => void) => void;
  colors?: { brand: string };
  helpLinks?: HelpLinks;
  signOutLink?: string;
  customButtons?: { title: string, className: string, click: () => void }[];
  features?: FeatureFlags;
}

declare interface AuthParams {
  pkce?: boolean;
  display?: 'popup' | 'page';
  responseMode?: 'okta_post_message' | 'fragment' | 'query' | 'form_post';
  responseType?: ('id_token' | 'token' | 'access_token' | 'code')[];
  scopes?: string[];
  state?: string;
  nonce?: string;
  issuer?: string;
  authorizeUrl?: string;
  authScheme?: string;
}

declare interface HelpLinks {
  help?: string;
  forgotPassword?: string;
  unlock?: string;
  factorPage?: { text: string, href: string };
  custom?: { text: string, href: string, target?: string }[];
}

declare interface FeatureFlags {
  router?: boolean;
  rememberMe?: boolean;
  autoPush?: boolean;
  smsRecovery?: boolean;
  callRecovery?: boolean;
  webauthn?: boolean;
  selfServiceUnlock?: boolean;
  multiOptionalFectorEnroll?: boolean;
  hideSignOutLinkInMFA?: boolean;
  registration?: boolean;
  idpDiscovery?: boolean;
  showPasswordToggleOnSignInPage?: boolean;
}

declare interface RenderOptions {
  el: string;
}

declare interface EventError {
  name: string;
  message: string;
  statusCode?: number;
  xhr?: Response;
}

declare class OktaSignIn {
  public authClient: any;

  constructor(options: OktaSignInOptions);

  public showSignInToGetTokens(options: RenderOptions): Promise<any>;

  public showSignInAndRedirect(options: RenderOptions): Promise<any>;

  public hide();

  public show();

  public remove();

  public on(event: string, callback: (context: { controller: string }, error?: EventError) => void);
}

declare module "@okta/okta-signin-widget" {
  export default OktaSignIn;
}
