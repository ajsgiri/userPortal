import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-user', pathMatch: 'full' },
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-users', component: UserListComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'add-role', component: AddRoleComponent },
  { path: 'view-roles', component: RoleListComponent },
  { path: 'edit-role/:id', component: EditRoleComponent }
];

@NgModule({
  imports: [CommonModule,   RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
  )
  // other imports here
],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
