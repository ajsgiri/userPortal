import { Component, OnInit } from '@angular/core';
import { CrudService } from '../common/crud.service';
import { Role } from './../common/role';  

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})

export class RoleListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  roleList: Role[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;     

  
  constructor( public crudApi: CrudService) { }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetRoles(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.roleList = [];
      data.forEach((item, i) => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.roleList.push(a as Role);
        this.roleList[i]["permissions"] = Object.values(this.roleList[i]["permissions"]);
      })
    })
  }

  dataState() {     
    this.crudApi.GetRoles().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  deleteRole(role : Role) {
      this.crudApi.DeleteRole(role.$key) // Using Delete student API to delete student.    
  }
}
