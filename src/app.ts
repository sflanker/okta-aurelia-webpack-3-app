import OktaSignIn from '@okta/okta-signin-widget';

import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export class App {
  protected loginContainer: HTMLElement;

  private oktaSignInWidget: OktaSignIn;

  constructor() {
  }

  attached(): void {
    console.log('App started.');
    this.oktaSignInWidget = new OktaSignIn({
      baseUrl: 'https://login.invio.dev',
      clientId: '0oa4mzshotdjdn65e5d6',
      redirectUri: 'https://okta-aurelia-webpack-app.invio.dev/login',
      features: {
        idpDiscovery: true
      }
    });

    this.oktaSignInWidget
      .showSignInToGetTokens({
        el: '#login-container'
      })
      .then(tokens => {
        console.log('Login Succeeded!');
        console.log(tokens);
      })
      .catch(error => {
        console.error('Login Failed!');
        console.log(error);
      });
  }
}