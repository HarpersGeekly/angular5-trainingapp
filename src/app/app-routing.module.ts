import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { PostShowComponent } from './post-show/post-show.component';

const routes: Routes = [
  { path: '', component: PostsIndexComponent},
  { path: 'posts/:id/:title', component: PostShowComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ], // You first must initialize the router and start it listening for browser location changes.
  // The method is called forRoot() because you configure the router at the application's root level.
  // The forRoot() method supplies the service providers and directives needed for routing,
  // and performs the initial navigation based on the current browser URL.

})
export class AppRoutingModule {}
