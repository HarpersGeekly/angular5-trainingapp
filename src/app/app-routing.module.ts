import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { PostShowComponent } from './post-show/post-show.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {LoginComponent} from './user-login/login.component';
import {RegisterComponent} from './user-register/register.component';
import {AuthGuard} from './services/authGuard.service';
import {UserEditComponent} from './user-edit/user-edit-component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';

const routes: Routes = [
  { path: '', component: PostsIndexComponent},
  { path: 'post/:id/:title', component: PostShowComponent},
  { path: 'post/create', component: PostCreateComponent, },
  { path: 'post/edit/id/:id', component: PostEditComponent},
  { path: 'user/profile/:id/:username', component: UserProfileComponent},
  { path: 'user/profile/my-profile/:id/:username', component: UserProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register/:success', component: UserEditComponent},
  { path: 'login', component: LoginComponent}
];
// , canActivate: [AuthGuard]}
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ], // You first must initialize the router and start it listening for browser location changes.
  // The method is called forRoot() because you configure the router at the application's root level.
  // The forRoot() method supplies the service providers and directives needed for routing,
  // and performs the initial navigation based on the current browser URL.

})
export class AppRoutingModule {}
