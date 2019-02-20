import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../common/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  editForm: FormGroup;  // Define FormGroup to student's edit form
  permissions: string[] = [
    "create", "read", "update", "delete", "publish", "archive"
  ];
  selectedPermissions: string[] = [];

  constructor(
    private crudApi: CrudService,       
    private fb: FormBuilder,         
    private location: Location,         
    private actRoute: ActivatedRoute,
    private router: Router,             
  ) { }

  ngOnInit() {
    this.updateRoleData();  
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetRole(id).valueChanges().subscribe(data => {
      this.selectedPermissions = data.permissions;
      data.permissions = this.permissions;
      return this.editForm.setValue(data)
    })
    
    this.clearControls();
  }

  updateRoleData() {
    this.editForm = this.fb.group({
      name: [''],
      roleId: [''],
      permissions: this.addPermissionControls(),
    })
  }

  addPermissionControls() {
    const arr = this.permissions.map(() => {
      return this.fb.control(false);
    })
    return this.fb.array(arr);
  }

  clearControls() {
    this.editForm["permissions"] = [];
  }

  get $key() {
    return this.editForm.get('key');
  }

  get name() {
    return this.editForm.get('name');
  }

  get roleId() {
    return this.editForm.get('roleId');
  }

  get permissionsArray() {
    return this.editForm.get('permissions');
  }

  getSelectedPermissions() {
    this.permissionsArray['controls'].forEach((control, i) => {
      if (control.value) {
        this.selectedPermissions.push(this.permissions[i]);
      }
    })    
    return this.selectedPermissions;
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  ResetForm() {
    this.editForm.reset();
  }  

  updateForm() {
    let editedRole = this.editForm.value
    editedRole.permissions = this.getSelectedPermissions();
    this.crudApi.UpdateRole(editedRole);
    //this.router.navigate(['view-roles']);               // Navigate to student's list page when student data is updated
  }

}
