import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PostService} from './services/post.service';
import { PostShowComponent } from './post-show/post-show.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './services/user.service';
import {NgbAlertConfig, NgbDropdownConfig, NgbModule, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PostsIndexComponent,
    PostShowComponent,
    NavbarComponent,
    RegisterComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [PostService, UserService, NgbAlertConfig, NgbDropdownConfig, NgbTabsetConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
