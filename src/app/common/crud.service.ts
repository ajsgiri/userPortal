import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Role } from '../common/role';
import {
  AngularFireDatabase, AngularFireList,
  AngularFireObject
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  userList: AngularFireList<any>;
  roleList: AngularFireList<any>;

  userInstance: AngularFireObject<any>;
  roleInstance: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  AddUser(user: User) {
    this.userList.push({
      name: user.name,
      email: user.email,
      username: user.username,
      roles: []
    })
  }

  AddRole(role: Role) {
    this.roleList.push({
      name: role.name,
      roleId: role.roleId,
      permissions: role.permissions
    })
  }

  GetUser(id: string) {
    this.userInstance = this.db.object('user-list/' + id);
    return this.userInstance;
  }

  GetRole(id: string) {
    this.roleInstance = this.db.object('role-list/' + id);
    return this.roleInstance;
  }

  GetUsers() {
    this.userList = this.db.list('user-list')
    return this.userList;
  }

  GetRoles() {
    this.roleList = this.db.list('role-list')
    return this.roleList;
  }

  UpdateUser(user : User) {
    if (this.userList) {
      this.userInstance.update({
        name: user.name,
        username: user.username,
        email: user.email,
        roles: user.roles
      })
    }
  }

  UpdateRole(role: Role) {
    if (this.roleList) {
      this.roleInstance.update({
        name: role.name,
        roleId: role.roleId,
        permissions: role.permissions,
      })
    }
  }

  DeleteUser(id: string) {
    this.userInstance = this.db.object('user-list/' + id);
    this.userInstance.remove();
  }

  DeleteRole(id: string) {
    this.userInstance = this.db.object('role-list/' + id);
    this.userInstance.remove();
  }

}
