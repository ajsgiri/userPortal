import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRoleComponent,
    AddUserComponent,
    EditUserComponent,
    EditRoleComponent,
    UserListComponent,
    RoleListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module 
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
