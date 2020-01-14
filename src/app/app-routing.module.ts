import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreatorComponent } from './creator/creator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
