import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs"
import { CrudService } from '../common/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  public userForm: FormGroup;  // Define FormGroup to student's form
  rolesList: Observable<any[]>;
  rolesArray: [];

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
  ) { }

 
  ngOnInit() {
    this.crudApi.GetUsers();  // Call GetStudentsList() before main form is being called
    this.rolesList = this.crudApi.GetRoles().valueChanges();
   // this.rolesArray = JSON.stringify(this.rolesList);
    window.localStorage.setItem("user", "1");
  
    this.addUserForm();              // Call student form when component is ready
  }

  // Reactive student form
  addUserForm() {
    this.userForm = this.fb.group( {
      name: [''],
      username: [''],
      email: [''],
      roles: ['']
    })
  }

  // Accessing form control using getters
  get name() {
    return this.userForm.get('name');
  }

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get roles() {
    return this.userForm.get('roles')
  }

  // Reset student form's values
  ResetForm() {
    this.userForm.reset();
  }  
 
  submitUserData() {
    this.crudApi.AddUser(this.userForm.value); // Submit student data using CRUD API
    this.ResetForm();  // Reset form when clicked on reset button
   };


}

