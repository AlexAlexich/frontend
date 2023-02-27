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
import { ApiService } from './Services/Api/api.service';
import { UserResponse } from './Models/Backend/UserResponse';
import { CreateCasseteModel } from './Models/Backend/CreateCasseteModel';

export function getCurrentUser(authorizationService: AuthorizationService) {
  return (): Observable<void> => {
    return of(authorizationService.initService());
  };
}
export function getAllUsers(api: ApiService) {
  return (): Observable<Array<UserResponse>> => {
    return api.getAllUsers();
  };
}
export function getAllCassette(api: ApiService) {
  return (): Observable<Array<CreateCasseteModel>> => {
    return api.getAllCassettes();
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
      useFactory: getCurrentUser,
      deps: [AuthorizationService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getAllUsers,
      deps: [ApiService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getAllCassette,
      deps: [ApiService],
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
