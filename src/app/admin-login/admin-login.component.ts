import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core_auth/auth/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isUserLoggedIn:boolean = false;
  loading : boolean;
  msg: string;
  isFormSubmitted = false;
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string;
  constructor(public http: HttpClient, private formBuilder: FormBuilder, public fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.adminLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
      if (response) {
        this.refresh(response);
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('role_id', response.data.role_id);
      }
    }, (error) => {
      //alert(error);
    });
  }
  refresh(response){    
      if((response.error == false)){
        this.isUserLoggedIn = true;
        this.loading = !this.loading;
        this.isUserLoggedIn = this.authService.isUserLoggedIn();
        this.router.navigateByUrl('/pages/catagories/category-list');
      }else{
        //console.log(response.message)
        this.msg = response.message
        this.openDialog();
      }
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.msg = result;
    });
  }
  makeHttpCall() {
    this.http.get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((r) => {
        //console.log(r);
      });
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}