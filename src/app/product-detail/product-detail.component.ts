import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../core_auth/service/rest.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  cat_id :any;
  productId : any;
  msg: string;
  error:string;
  percentDone : any;
  submitted = false;
  loading : boolean;
  isShowDiv = true;
  cart_image_name : any;
  cart_image_url : any;
  private activeRoute: any;
  inputnumber = 0;
  user:any=[];
  price = 0; 
  subCatimage: string;
  dropdownList : Array<any> = [];
  dropdownList2 : Array<any> = [];
  products: Array<any> = [];
  similorProducts: any = [];
  dropdownSettings = {};
  dropdownSettings2= {};
  similorProduct: Array<any> = [];
  product:any = [];
  image_path: any = [];
  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'single';
  pivotsize: any = [];
  pivotcolor: any = [];
  selectedItems = [];
  selectedItems2 = [];
  form: FormGroup;
  
  constructor( private location: Location ,  public dialog: MatDialog, public fb: FormBuilder, private restService: RestService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.form = this.fb.group({
      category_id:['', Validators.required ],
      sub_category_id:['', Validators.required ],
      helium_airfilled_id:['', Validators.required ],
      quantity: ['', Validators.required ],
      price:['', Validators.required ],
      cart_image_name: ['', Validators.required ],
      cart_image_url:['', Validators.required ],
    })
   }
   onItemSelect(item: any) {
    for(var i = 0; i < this.dropdownList.length; i++){
      if (item.item_id == this.dropdownList[i].item_id){
        this.subCatimage = this.dropdownList[i].img;
      }
    }
  }
  onHeliumSelect(item: any){
    for(var i = 0; i < this.dropdownList2.length; i++){
      if (item.id == this.dropdownList2[i].id){
        this.price = this.dropdownList2[i].price;
      }
    }
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  onItemSelect2(item: any) {
    //console.log(item);
  }
  onSelectAll2(items: any) {
    //console.log(items);
  }
  reload(){
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id =  params["id"] ;
    //console.log(params["id"]);
    });
    this.restService.post(`/api/similior-product?product_id=${id}`).subscribe((data) => {
      this.similorProducts = data["data"];
    }, (error) => {
      console.log(error)
   });
  }
  
  ngOnInit(): void {
    let tmp2 = [];
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id =  params["id"];
    });
    
    this.restService.post(`/api/product-details?product_id=${id}`).subscribe((data) => {
      this.product = data["data"];
      // this.product = data["data"]["category"]
      // this.product = data["data"]["sub_category"]
      this.productId = this.product.id
      for (let k = 0; k < data["data"]["sub_category"].length; k++) {
        this.cart_image_name = this.product["sub_category"][k].image_name
        this.cart_image_url = this.product["sub_category"][k].image_url
        this.cat_id = this.product.category.id
      }
      let tmp = [];
      let sel = [];
      let sel2 = [];
      
      sel.push({ item_id: data["data"]["sub_category"][0].sub_cat, item_text: data["data"]["sub_category"][0].sub_cat_name});

      this.subCatimage = data["data"]["sub_category"][0].image_url;
      
      if(data["data"]["heliums"][0].helium_id == 1){
        sel2.push({ id: data["data"]["heliums"][0].helium_id, text: "Helium" });
        this.price = data["data"]["heliums"][0].price;
      }else{
        sel2.push({ id: data["data"]["heliums"][0].helium_id, text: "Non-Helium" });
        this.price = data["data"]["heliums"][0].price;
      }

      this.selectedItems = sel;
      
      this.selectedItems2 = sel2;
     
      for (let i = 0; i < data["data"]["sub_category"].length; i++) {
        tmp.push({ item_id: data["data"]["sub_category"][i].sub_cat, item_text: data["data"]["sub_category"][i].sub_cat_name, img: data["data"]["sub_category"][i].image_url})
      }
      this.dropdownList = tmp;
      for (let i = 0; i < data["data"]["heliums"].length; i++) {
        if(data["data"]["heliums"][i].helium_id == 1){
          tmp2.push({id: data["data"]["heliums"][i].helium_id, text: "Helium", price: data["data"]["heliums"][i].price});
        }else{
          tmp2.push({id: data["data"]["heliums"][i].helium_id, text: "Non-Helium", price: data["data"]["heliums"][i].price});
        }
      }    
      this.dropdownList2 = tmp2;
    }, (error) => {
   });
    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      itemsShowLimit: 9,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: "id",
      textField: "text",
      itemsShowLimit: 9,
      allowSearchFilter: true
    };
    this.reload();
  }
  submitForm() {
    let val = [];
    let val2 = [];
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');

    formData.append("customer_id", user_id);
    formData.append("product_id", this.productId);
    formData.append("quantity", this.inputnumber);
    formData.append("cart_image_name", this.cart_image_name);
    formData.append("category_id", this.cat_id);
    formData.append("cart_image_url", this.cart_image_url);
    formData.append("price", this.form.get('price').value.replace('$', ''));
    for (let i = 0; i < this.form.get('helium_airfilled_id').value.length; i++) {
      val.push(this.form.get('helium_airfilled_id').value[i].id);
    }
    formData.append("helium_airfilled_id", val);
    for (let i = 0; i < this.form.get('sub_category_id').value.length; i++) {
      val2.push(this.form.get('sub_category_id').value[i].item_id);
    }
    formData.append("sub_category_id", val2);
    this.submitted = true;
      this.loading = true;
      this.http.post(endpoint + '/api/addtocart', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
          if(error){
            this.error = error;
            this.openDialog2();
          }
          //alert(error);
          this.loading = !this.loading;
        });
    
      }
  refresh(response){
    if(response['status'] == 200){
     //alert("Category Updated successfully");
      this.router.navigate(['/cart/{{user.id}}']);
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
  openDialog2(): void {
    let dialogRef = this.dialog.open(ErrorOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: "Kindly login or register first to add any product into the cart." }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.msg = this.error;
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
  
  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'single';
    }
  }
  plus()
  {
    this.isShowDiv = false;
    this.inputnumber += 1;
  }
  minus()
  {
    if(this.inputnumber-1 < 1){
      this.inputnumber = 1;
      }
      else{
      this.inputnumber -= 1;
      }
  
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
@Component({
  selector: 'error-overview-example-dialog',
  templateUrl: 'error-overview-example-dialog.html',
})
export class ErrorOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<ErrorOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}