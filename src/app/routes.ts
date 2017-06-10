import {Routes} from '@angular/router';

import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {ItemsComponent} from './items/items/items.component';
import {UsersComponent} from './users/users/users.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthGuard} from './services/auth.guard';
import {CanDeactivateEditGuard} from './services/can-deactivate-edit.guard';

/**
 * Created by onur on 31.05.17.
 */

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'app',
    component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'items/page/:page',
        component: ItemsComponent,
        canDeactivate: [CanDeactivateEditGuard]
      },

      {
        path: 'users',
        component: UsersComponent,
        canDeactivate: [CanDeactivateEditGuard]
      }
    ]
  },
  {
    path: '**', redirectTo: 'login'
  }

];
