import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlPtBr } from './utils/matPaginatorIntlPtBr';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideEnvironmentNgxMask(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlPtBr
    }
  ]
};
