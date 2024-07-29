import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { numeric, RxwebValidators } from '@rxweb/reactive-form-validators';
import { templateJitUrl } from '@angular/compiler';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  fileName : any;
  isNotShowDiv = true
  isShowDiv = false;
  myFiles:string [] = [];
  p = document.createElement("div");
  isHidden = true;
  dropdownSettings = {};
  submitted = false;
  selectedItems = [];
  selectitemId = [];
  dropdownList : Array<any> = [];
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  massage: string;
  msg: string;
  product:any=[];
  category: any;
  categories: any = [];
  subcategories: Array<any> = [];
  selectedSub : Array<any> = [];
  subfinal : Array<any> = [];
  heliumfinal : Array<any> = [];
  selectedHelium:Array<any> = [];
  imagepath : Array<any> = [];
  temp = 0;
  temp1 = 0;
  j = 0;
  x = 0;
  dropdownList2 = [];
  selectedItems2 = [];
  dropdownSettings2 = {};
  dropdownList3 : any = [];
  selectedItems3 = [];
  dropdownSettings3 = {};
  product_data : Array<any> = [];
  helium_airfilled : Array<any> = [];
  image:any [] = [];
  imageBlob:any= [];
  file: any [] = [];
  inputValue : any;
  imageDataEvent: any;
  products:Array<any> = [];
  private activeRoute: any;
  localUrl: any;
  localCompressedURl:any;
  isFlip: boolean = false;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  compressImage:any;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private elementRef:ElementRef, private imageCompress: NgxImageCompressService, private http: HttpClient, private router: Router,public fb: FormBuilder, private location: Location,  public dialog: MatDialog) {}
  get f() { return this.form.controls; }
  ngOnInit(): void {
      var product_id;
      this.activeRoute = this.route.params.subscribe(params => {
        product_id =  params['id'];
      });
      var formData: any = new FormData();
      formData.append("product_id", product_id);
      this.http.post(endpoint + "/api/admin/viewProduct" , formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
        this.product = data["data"];
        let tmp3 = [];
        for (let i = 0; i < this.product["heliums"].length; i++) {
          if(this.product["heliums"][i].helium_id == 1){
            tmp3.push({id: this.product["heliums"][i].helium_id, text: "Helium"});
          }else{
            tmp3.push({id: this.product["heliums"][i].helium_id, text: "Non-Helium"});
          }
        }
        let sel3 = [];
        for (let j = 0; j < this.product.heliums.length; j++) {
          sel3.push(this.product.heliums[j].helium_id);
        }
        this.selectedItems3 = sel3;
      }, (error) => {
        alert(error['error']['meta']['msg']);
      });


    this.form = this.fb.group({
      product_name:['', Validators.required],
      product_data:['', Validators.required],
      description:['', Validators.required],
      sub_cat: ['', Validators.required],
      category_id: ['', Validators.required],
      helium_airfilled: ['', Validators.required],
      helium_id:['', Validators.required],
      short_description: ['', Validators.required],
      image_name: ['', Validators.required],
      price: ['', Validators.required],
      Hprice: ['', Validators.required],
      NHprice: ['', Validators.required],
      product_image:['', Validators.required],
      product_main_image: ['', Validators.required],
    });
  }
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    this.isNotShowDiv = !this.isNotShowDiv;
  }
 
  submitForm() {
    this.msg = "";
    this.isFormSubmitted = true;
    
    let val = [];
    // if (this.form.invalid) {
    //   return;
    // }
    this.loading = true;
    var formData: any = new FormData();
    var a = 0, b = 0;
    formData.append("product_name", this.form.get('product_name').value);
    formData.append("description", this.form.get('description').value);
    a = (this.form.get('Hprice').value);
    b = (this.form.get('NHprice').value);
    
    //this.helium_airfilled = Array();
    // for (let k= 0; k < this.selectedItems3.length; k++){
    //   if(this.selectedItems3[k] != undefined || this.selectedItems3[k] != null){
    //     this.heliumfinal[this.x] = this.selectedItems3[k];
    //     this.x++;
    //   }
    // }
    if(a > 0 && b > 0){
      this.helium_airfilled.push({
        helium_id : 1,
        price : this.form.get('Hprice').value
      });
      this.helium_airfilled.push({
        helium_id : 2,
        price : this.form.get('NHprice').value
      });
    }else if(a > 0 && b == 0){
      this.helium_airfilled.push({
        helium_id : 1,
        price : this.form.get('Hprice').value
      });
    }else if(a == 0 && b > 0){
      this.helium_airfilled.push({
        helium_id : 2,
        price : this.form.get('NHprice').value
      });
    }else{
      this.msg = "Enter Value for Helium or Non Helium";
      this.openDialog();
      this.loading = false;
    }

    formData.append("helium_airfilled", JSON.stringify(this.helium_airfilled));

    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id =  params['id'];
    });
    if(this.helium_airfilled.length > 0){
      this.http.post(endpoint + `/api/admin/updateproduct/${id}`, formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
        (response) => {
          if (response.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * response.loaded / response.total);
          }
          if(response['body'] != undefined)
          {
            this.refresh(response);
          }
        },
        (error) => {
          alert(error['massage']);
          this.loading = !this.loading;
        }
      )
    }
  }
  refresh(response){
    if(response['status'] == 200){
      this.msg = response["body"]["msg"];
      this.loading = !this.loading;
      this.router.navigate(['/pages/product/product-list']);
      //alert("Category added Successfully");
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
  getHeader(isFormData?) {
    let headers: HttpHeaders = new HttpHeaders();
    
    if (!isFormData) {
      headers = headers.append('Content-Type', 'json');
    }
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
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