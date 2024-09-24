import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:"/home",
    pathMatch:"full"
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
