import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimplemdeModule } from 'ngx-simplemde';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbAlertConfig, NgbDropdownConfig, NgbModule, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PostService} from './services/post.service';
import { PostShowComponent } from './post-show/post-show.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './user-register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './user-login/login.component';
import { AuthGuard } from './services/authGuard.service';
import { AlertService} from './services/alert.service';
import { UserEditComponent } from './user-edit/user-edit-component';
import { UsersComponent } from './users/users.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { UsernameValidatorDirective } from './directives/username-validator.directive';
import { AlertComponent } from './alert/alert.component';
import { PostCreateComponent } from './post-create/post-create.component';
// import { JwtInterceptor } from './services/jwt-interceptor.service';
import { PostEditComponent } from './post-edit/post-edit.component';


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
