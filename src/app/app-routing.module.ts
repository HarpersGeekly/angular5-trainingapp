import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { PostShowComponent } from './post-show/post-show.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './services/authGuard.service';
import {EditUserComponent} from './edit-user/edit-user.component';
import {PostCreateComponent} from './post-create/post-create.component';

const routes: Routes = [
  { path: '', component: PostsIndexComponent},
  { path: 'post/:id/:title', component: PostShowComponent},
  { path: 'post/create', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'user/profile/:id/:username', component: UserProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register/:success', component: EditUserComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ], // You first must initialize the router and start it listening for browser location changes.
  // The method is called forRoot() because you configure the router at the application's root level.
  // The forRoot() method supplies the service providers and directives needed for routing,
  // and performs the initial navigation based on the current browser URL.

})
export class AppRoutingModule {}
