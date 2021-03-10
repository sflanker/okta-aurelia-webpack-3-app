import { DialogConfiguration } from 'aurelia-dialog';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Config as NotificationConfig } from 'aurelia-notification';

import 'materialize-css';

import shared from 'resources';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'),
      (bridge: any) => {
        bridge.useAll();
      }
    )
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-notification'), (config: NotificationConfig) => {
      config.configure({
        translate: false,
        defaults: {
          timeout: 4000
        },
        notifications: {
          success: 'humane-flatty-success',
          error: 'humane-flatty-error',
          info: 'humane-flatty-info'
        }
      });
    })
    .plugin(PLATFORM.moduleName('aurelia-dialog'), (config: DialogConfiguration) => {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.centerHorizontalOnly = false;
      config.settings.enableEscClose = true;
    })
    .plugin(PLATFORM.moduleName('aurelia-ui-virtualization'))
    .globalResources(shared.resources);

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'), document.body);
}
