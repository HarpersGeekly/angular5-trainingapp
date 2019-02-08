import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PostService} from './services/post.service';
import { PostShowComponent } from './post-show/post-show.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertConfig, NgbDropdownConfig, NgbModule, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authGuard.service';
import { AlertService} from './services/alert.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { UsernameValidatorDirective } from './directives/username-validator.directive';
import { AlertComponent } from './alert/alert.component';
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
    EditUserComponent,
    UsersComponent,
    EmailValidatorDirective,
    UsernameValidatorDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [PostService, UserService,
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
export class AppModule { }
