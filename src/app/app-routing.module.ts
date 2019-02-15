import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemasComponent } from './cinemas/cinemas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cinemas',
    pathMatch: 'full'
  },
  {
    path: 'cinemas',
    component: CinemasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
