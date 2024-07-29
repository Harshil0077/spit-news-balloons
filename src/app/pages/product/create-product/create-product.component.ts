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
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateProductComponent implements OnInit {
  fileName : any;
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
  private activeRoute: any;
  localUrl: any;
  localCompressedURl:any;
  isFlip: boolean = false;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  compressImage:any;

  form: FormGroup;
  constructor( private route: ActivatedRoute, private elementRef:ElementRef, private imageCompress: NgxImageCompressService, private http: HttpClient, private router: Router,public fb: FormBuilder, private location: Location,  public dialog: MatDialog) {
    this.dropdownList3 = [
      { item_id: 1, item_text: "Helium" },
      { item_id: 2, item_text: "Non-Helium" },
    ];
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAll: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
   }
   get f() { return this.form.controls; }
  ngOnInit(): void {
    
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
      product_image:['', Validators.required],
      product_main_image: ['', Validators.required],
    });
    

    this.http.get(endpoint + "/api/admin/category", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.categories = data["data"];
      let tmp = [];
        for (let i = 0; i < data["data"].length; i++) {

          tmp.push({ item_id: data["data"][i].id, item_text: data["data"][i].category_name});

          this.dropdownList = tmp;
        }
      }, (error) => {
      alert(error['message']);
    });
    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
  }
  
  onItemSelect(item : any){
    var id;
      this.activeRoute = this.route.params.subscribe(params => {
        id = item.item_id;
    });

    this.http.get(endpoint + `/api/admin/subcategory?category_id=${id}`, {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.subcategories = data["data"];
      let tmp2 = [];
      if(data["data"].length > 0){
        for (let i = 0; i < data["data"].length; i++) {

          tmp2.push({ item_id: data["data"][i].id, item_text: data["data"][i].sub_cat_name});

          this.dropdownList2 = tmp2;
        }
      }else{
        this.dropdownList2 = [];
      }

    }, (error) => {
      alert(error['message']);
    });
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  onItemDeSelect (item: any){
    
  }
  onHeliumSelect(item : any){
    const app = document.getElementById("heliumPrice");
    // 2. Create a new <p></p> element programmatically
    this.p = document.createElement("div");
    this.p.id = "price-container " + item.item_id;
    // 3. Add the text content
    this.p.innerHTML = `<label for="image">Price for `+item.item_text+`</label>
    <input class="form-control" id="H-`+item.item_id+`" type="number" placeholder="price" formControlName="price" [ngClass]="{ 'is-invalid': submitted && f.price.errors }">
    <div *ngIf="submitted && f.price.errors" class="invalid-feedback"><div *ngIf="f.price.errors.required">Product Name is required</div></div></div>`;
    // 4. Append the p element to the div element
    app?.appendChild(this.p);
  //   let priceval = document.getElementById(`+item.item_id+`).addEventListener("click", () => {
     
  //     let dateVal = document.getElementById("date-val");
  // });
    this.selectedHelium[this.temp1] = item.item_id;
    this.temp1++;
  }
  
  onHeliumDeSelect(item: any){
    //this.inputValue = (<HTMLInputElement>document.getElementById("H-" + item.item_id)).value;
    var id = item.item_id;
    const app = document.getElementById("price-container "+ id);
    app.remove();
    const index = this.selectedHelium.indexOf(id);
    this.selectedHelium.splice(index, 1);
    // this.selectedHelium.forEach((element,index)=>{
    //   if(element==id) this.selectedHelium.splice(index,1);
    // });
  }
  onSubSelect(item: any) {
    const app = document.getElementById("box");
    // 2. Create a new <p></p> element programmatically
    this.p = document.createElement("div");
    // 3. Add the text content
    this.p.innerHTML = `<div id="innerdiv `+item.item_id+`"><label for="image">Upload Picture for `+item.item_text+`</label>
    <input type="file" id=`+item.item_id+` formControlName="image_name" name="image" class="form-control `+item.item_id+`" accept=".png, .jpeg, .jpg" [ngClass]="{ 'is-invalid': submitted && f.image.errors }">
    <div *ngIf="submitted && f.image.errors" class="invalid-feedback">
        <div *ngIf="f.image.errors.required">Image is required</div></div></div>`;
    
    // 4. Append the p element to the div element
    app?.appendChild(this.p);
    const val = item.item_id;
    var el = document.getElementById(item.item_id);
    el.addEventListener('change', this.uploadProfile.bind(this, val));

    this.selectedSub[this.temp] = item.item_id;
    this.temp++;

    
  }
  onSubDeSelect(item: any) {
    var id = item.item_id;
    const app = document.getElementById("innerdiv "+ id);
    app.innerHTML = ``;
    const index = this.selectedSub.indexOf(id);
    this.selectedSub.splice(index, 1);
    // this.selectedSub.forEach((element,index)=>{
    //   if(element==id) this.selectedSub.splice(index,1);
    // });
    
  }
  
  onSelectAll(items: any) {
    
  }
  
  uploadFile(event) {
    
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      product_main_image: file,
    });
    this.form.get('product_main_image').updateValueAndValidity()
  }

  uploadProfile(val : any, event : any) {
    for (var i = 0; i < event.target.files.length; i++) {
      
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.fileName = this.file['name'];
      this.imagepath.push({FileName : this.fileName, SubId : val});
    }
  }
  
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;

  compressFile(image,fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
      
      this.imageCompress.compressFile(image, orientation, 85, 85).then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
          const imageName = fileName;
          this.imageBlob.push(this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]));
          this.compressImage = new File([result], imageName, { type: 'image/jpeg' });
        }
      );
  }
   dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  submitForm() {
    this.isFormSubmitted = true;
    
    let val = [];
    // if (this.form.invalid) {
    //   return;
    // }
    this.loading = true;
    var formData: any = new FormData();

    formData.append("product_name", this.form.get('product_name').value);
    formData.append("description", this.form.get('description').value);
    formData.append("product_main_image", this.form.get('product_main_image').value);
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("product_image[]", this.myFiles[i]);
    }
    for (let i = 0; i < this.form.get('category_id').value.length; i++) {
      val.push(this.form.get('category_id').value[i].item_id);
    }
    for (let i= 0; i < this.imagepath.length; i++){
      for(let j= i+1; j < this.imagepath.length; j++){
        if(this.imagepath[i].SubId == this.imagepath[j].SubId)
        {
          //this.imagepath.splice(i, 1); 
          this.imagepath.splice(i, 1, this.imagepath[j]);
        }
      } 
    }
    for (let i = 0; i < this.selectedSub.length; i++){
      if(this.selectedSub[i] != undefined || this.selectedSub[i] != null){
        this.subfinal[this.j] = this.selectedSub[i];
        this.j++;
      }
    }
    for (let i= 0; i < this.subfinal.length; i++){
      this.product_data.push({
          category_id : val[0],
          sub_cat : this.subfinal[i],
          image_name : this.imagepath[i].FileName //imgId.slice(-(this.selectedSub.length - i), -1)[0]
        });
    }
    formData.append("product_data", JSON.stringify(this.product_data));
    
    //this.helium_airfilled = Array();
    for (let k= 0; k < this.selectedHelium.length; k++){
      if(this.selectedHelium[k] != undefined || this.selectedHelium[k] != null){
        this.heliumfinal[this.x] = this.selectedHelium[k];
        this.x++;
      }
    }
    for (let k= 0; k < this.heliumfinal.length; k++){
      this.helium_airfilled.push({
        helium_id : this.heliumfinal[k],
        price : (<HTMLInputElement>document.getElementById("H-" + this.heliumfinal[k])).value
      });
    }
    formData.append("helium_airfilled", JSON.stringify(this.helium_airfilled));
   
    this.http.post(endpoint + '/api/admin/product', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
  refresh(response){
    if(response['status'] == 200){
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