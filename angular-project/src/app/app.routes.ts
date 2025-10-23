import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' }, 
  { path: 'about', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemComponent },
  { path: '**', redirectTo: '/items' } 
];