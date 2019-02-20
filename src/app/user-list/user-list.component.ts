import { Component, OnInit } from '@angular/core';
import { CrudService } from '../common/crud.service';
import { User } from './../common/user';  

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  userList: User[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;     

  constructor( public crudApi: CrudService) { }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetUsers(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.userList = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.userList.push(a as User);
      })
    })
  }

  dataState() {     
    this.crudApi.GetUsers().valueChanges().subscribe(data => {
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

  deleteUser(user : User) {
      this.crudApi.DeleteUser(user.$key) // Using Delete student API to delete student.    
  }
}
