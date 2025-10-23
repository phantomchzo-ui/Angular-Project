import { Routes } from '@angular/router';
import {AboutUsComponent} from './about-us/about-us.component';
import {LoginComponent} from './login/login.component';
import { TodosListComponent } from './todos-list/todos-list.component';

export const routes: Routes = [
  { path: 'about', component: AboutUsComponent },
  {path: 'login', component: LoginComponent},
  {path: 'todos', component: TodosListComponent}

];
