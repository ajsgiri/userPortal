import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../common/crud.service';
import { User } from '../common/user';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to student's edit form
  
  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
  ){ }

  ngOnInit() {
    this.updateStudentData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetUser(id).valueChanges().subscribe(data => {
      return this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  // Accessing form control using getters
  get $key() {
    return this.editForm.get('key');
  }

  get name() {
    return this.editForm.get('name');
  }

  get username() {
    return this.editForm.get('username');
  }

  get email() {
    return this.editForm.get('email');
  }

  // Contains Reactive Form logic
  updateStudentData() {
    this.editForm = this.fb.group({
      name: [''],
      username: [''],
      email: ['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateUser(this.editForm.value);       // Update student data using CRUD API
    this.router.navigate(['view-users']);               // Navigate to student's list page when student data is updated
  }

}
