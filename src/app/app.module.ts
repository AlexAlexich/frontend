import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { SharedModule } from './Shared/shared.module';
import { AuthorizationService } from './Services/Auth/authorization.service';
import { Observable, of } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './Services/Interceptor/Interceptor.service';
import { AuthorizedComponent } from './Pages/Authorized/Authorized.component';

export function initializeApp1(authorizationService: AuthorizationService) {
  return (): Observable<void> => {
    return of(authorizationService.initService());
  };
}
@NgModule({
  declarations: [AppComponent, LoginComponent, AuthorizedComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [AuthorizationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      useFactory: function (authService: AuthorizationService) {
        return new InterceptorService(authService);
      },
      deps: [AuthorizationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
