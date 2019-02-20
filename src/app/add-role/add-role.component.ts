import { Component, OnInit } from '@angular/core';
import { CrudService } from '../common/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'; // Reactive form services

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  public roleForm: FormGroup;  // Define FormGroup to student's form
  permissions: string[] = [
    "create", "read", "update", "delete", "publish", "archive"
  ];
  selectedPermissions: string[] = [];

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
  ) { }
 
  ngOnInit() {
    this.crudApi.GetRoles();  // Call GetStudentsList() before main form is being called
    this.addRoleForm();              // Call student form when component is ready
    this.roleForm.reset( name);
  }

  // Reactive student form
  addRoleForm() {
    this.roleForm = this.fb.group( {
      name: [''],
      roleId: [''],
      permissions: this.addPermissionControls(),
    })
  }

  addPermissionControls() {
    const arr = this.permissions.map( () => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  // Accessing form control using getters
  get name() {
    return this.roleForm.get('name');
  }

  get roleId() {
    return this.roleForm.get('roleId');
  }

  get permissionsArray() {
    return this.roleForm.get('permissions')
  }

  getSelectedPermissions() {
    this.selectedPermissions = [];
    this.permissionsArray['controls'].forEach( (control, i) => {
      if(control.value) {
        this.selectedPermissions.push(this.permissions[i]);
      }
    })
    this.roleForm.reset();
  }

  // Reset student form's values
  ResetForm() {
    this.roleForm.reset();
  }  
 
  submitRoleData() {
    this.roleForm.value.permissions = this.selectedPermissions;
    console.log(this.roleForm.value);
    this.crudApi.AddRole(this.roleForm.value); // Submit student data using CRUD API
    this.ResetForm();  // Reset form when clicked on reset button
   };


}
