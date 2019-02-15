import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplemdeModule } from 'ngx-simplemde';
import { NgbAlertConfig, NgbDropdownConfig, NgbModule, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

import { UserService } from './services/user.service';
import { PostService} from './services/post.service';
import { AlertService} from './services/alert.service';
import { AuthGuard } from './services/authGuard.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { PostShowComponent } from './post-show/post-show.component';
import { RegisterComponent } from './user-register/register.component';
import { LoginComponent } from './user-login/login.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit-component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { UsernameValidatorDirective } from './directives/username-validator.directive';
// import { JwtInterceptor } from './services/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsIndexComponent,
    PostShowComponent,
    NavbarComponent,
    RegisterComponent,
    UserProfileComponent,
    LoginComponent,
    UserEditComponent,
    UsersComponent,
    EmailValidatorDirective,
    UsernameValidatorDirective,
    AlertComponent,
    PostCreateComponent,
    PostEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SimplemdeModule.forRoot({}),
  ],
  providers: [PostService, UserService, SimplemdeModule,
    // {
    // provide: HTTP_INTERCEPTORS,
    // useClass: JwtInterceptor,
    // multi: true
  // },
  AuthGuard,
    AlertService, EmailValidatorDirective, UsernameValidatorDirective,
    // JwtInterceptor,
    NgbAlertConfig, NgbDropdownConfig, NgbTabsetConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
