import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core_auth/auth/auth.service';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  orders:Array<any> = [];
  loading : boolean;
  percentDone: any;
  years : number[] = [];
  totalAmount: any;
  private activeRoute: any;
  msg: string;
  error:string;
  qnt: Array<any> = [];
  paymentMethod: FormGroup;
  items: any = [];
  qunty:any=[];
  item: any = [];
  cart_id: Array<any> = [];
  newqnt = 0;
  cartQnt: FormGroup;
  pickUpDetail: FormGroup;
  isFormSubmitted : boolean = false;
  isFormSubmittedD :boolean = false;
months = [
  { month: '01'},
  { month: '02'},
  { month: '03'},
  { month: '04'},
  { month: '05'},
  { month: '06'},
  { month: '07'},
  { month: '08'},
  { month: '09'},
  { month: '10'},
  { month: '11'},
  { month: '12'}
];
times = [
  { time: '9:00 AM'},
  { time: '9:30 AM'},
  { time: '10:00 AM'},
  { time: '10:30 AM'},
  { time: '11:00 AM'},
  { time: '11:30 AM'},
  { time: '12:00 PM'},
  { time: '12:30 PM'},
  { time: '1:00 PM'},
  { time: '1:30 PM'},
  { time: '2:00 PM'},
  { time: '2:30 PM'},
  { time: '3:00 PM'},
  { time: '3:30 PM'},
  { time: '4:00 PM'},
  { time: '4:30 PM'},
  { time: '5:00 PM'},
  { time: '5:30 PM'},
  { time: '6:00 PM'},
  { time: '6:30 PM'},
  { time: '7:00 PM'},
  { time: '7:30 PM'},
  { time: '8:00 PM'},
  { time: '8:30 PM'},
  { time: '9:00 PM'},
];
  constructor(private route: ActivatedRoute, public http: HttpClient, private formBuilder: FormBuilder, public fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) {
    this.cartQnt = this.formBuilder.group({
        cqnt : ['']
     });

     this.pickUpDetail = this.formBuilder.group({
      pickup_date: ['', [Validators.required]],
      pickup_time: ['', [Validators.required]],
   });

     this.paymentMethod = this.formBuilder.group({
        total : ['', Validators.required ],
        orders : ['', Validators.required ],
        exp_month: ['', Validators.required ],
        exp_year:['', Validators.required ],
        cvc :['', Validators.required ],
        card_number: ['', Validators.required ],
    });
   }
  //  doSomething(){
  //    if(this.pickUpDetail.invalid){
  //     this.msg = "please select pickup date and time"
  //     this.openDialog3();
  //    }
  //  }
  ngOnInit(): void {
    let currentYear: number = new Date().getFullYear();
    for(let i = (currentYear); i < (currentYear + 10); i++) {
        this.years.push(i);
    }
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');
    formData.append("user_id", user_id);
    
    this.http.post(endpoint +"/api/getCart", formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.items = data["data"]["carts"];
      this.item = data["data"];
      if(this.items == undefined || this.items.length == 0){
        this.openDialog2();
      }
      //this.totalAmount
      this.qnt = [];
      this.cart_id = [];
      for (var i = 0; i < this.items.length; i++){
        this.qnt.push(this.items[i].quantity);
        this.cart_id.push(this.items[i].id);
      }
    }, (error) => {
      //console.log(error)
      this.error = error
      this.openDialog2();
    });
  }
  
  deleteItem(item){
    var formData: any = new FormData();
    
    formData.append("cart_id", item);

    this.http.post(endpoint+ "/api/cartdelete", formData, {headers: this.getHeader(FormData) }).subscribe(
      (response) => {
        this.refresh2(response);
        this.http.post(endpoint +"/api/getCart", formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
          this.items = data["data"]["carts"];
          this.item = data["data"];
          if(this.items == undefined || this.items.length == 0){
            this.openDialog2();
          }
          //this.totalAmount
          this.qnt = [];
          this.cart_id = [];
          for (var i = 0; i < this.items.length; i++){
            this.qnt.push(this.items[i].quantity);
            this.cart_id.push(this.items[i].id);
          }
        }, (error) => {
          //console.log(error)
          this.error = error
          this.openDialog2();
        });
      },
      (error) => {
        //alert(error);
        //console.log(error)
      });
  }
  
  plus(item)
  {
    for (var i = 0; i < this.cart_id.length; i++){
      if(item == this.cart_id[i] && this.newqnt != this.qnt[i]){
        this.newqnt = this.qnt[i];
      }
    }
    this.newqnt += 1;
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');

    formData.append("customer_id", user_id);
    formData.append("cart_id", item)
    formData.append("quantity", this.newqnt)
    
  
    this.http.post(endpoint + "/api/updateQuantity", formData, {headers: this.getHeader(FormData) }).subscribe(
      (response) => {
        this.refresh(response);
        this.totalAmount = response['amount'].total_amount
      },
      (error) => {
        //alert(error);
        //console.log(error)
      })
    
  }
  minus(item)
  {
    for (var i = 0; i < this.cart_id.length; i++){
      if(item == this.cart_id[i] && this.newqnt != this.qnt[i]){
        this.newqnt = this.qnt[i];
      }
    }
    this.newqnt -= 1;    
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');

    formData.append("customer_id", user_id);
    formData.append("cart_id", item)
    formData.append("quantity", this.newqnt)
    
  
    this.http.post(endpoint + "/api/updateQuantity", formData, {headers: this.getHeader(FormData) }).subscribe(
      (response) => {
        this.totalAmount = response['amount'].total_amount
        this.refresh(response);
      },
      (error) => {
        alert(error);
        console.log(error)
      })
      
  }
  
    
  refresh(response){
    if(response['status'] == 200){
      var formData: any = new FormData();
      var user_id = localStorage.getItem('userId');
      formData.append("user_id", user_id);
      
      this.http.post(endpoint + "/api/getCart", formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
        this.items = data["data"]["carts"];
        if(this.items == undefined){
          this.openDialog2();
        }
        this.qnt = [];
        this.cart_id = [];
        for (var i = 0; i < this.items.length; i++){
          this.qnt.push(this.items[i].quantity);
          this.cart_id.push(this.items[i].id);
        }
      }, (error = true) => {
        this.openDialog2();
      });

    }
  }
  getFormattedString(newDate){
    return (newDate.getMonth()+1) +"/"+newDate.getDate() + ''+"/" +newDate.getFullYear();
  }
  PayMent(){
    this.isFormSubmitted = true;
    
    var newDate = new Date(this.pickUpDetail.get('pickup_date').value);
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');
    
    formData.append("cvc", this.paymentMethod.get('cvc').value);
    formData.append("exp_year", this.paymentMethod.get('exp_year').value);
    formData.append("exp_month", this.paymentMethod.get('exp_month').value);
    formData.append("card_number", this.paymentMethod.get('card_number').value);
    formData.append("total", this.paymentMethod.get('total').value);
    formData.append("user_id", user_id);
    formData.append("pickup_date", this.getFormattedString(newDate));
    formData.append("pickup_time", this.pickUpDetail.get('pickup_time').value);
    for (var i = 0; i < this.items.length; i++){
      this.orders.push({
        product_id : this.items[i].product_id,
        category_id : this.items[i].category_id,
        sub_category_id : this.items[i].sub_category_id,
        quantity : this.items[i].quantity,
        helium_airfilled_id : this.items[i].helium_airfilled_id,
        subtotal:this.items[i].sub_total,
      });
    }
    formData.append("orders", JSON.stringify(this.orders));
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id = params['id'];
    });
    
      this.loading = true;
      this.http.post(endpoint + '/api/order', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
        (response) => {
          //console.log(response);
          if (response.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * response.loaded / response.total);
          }
          if(response['body'] != undefined)
          {
            this.refresh3(response);
          }
        },
        (error) => {
          //console.log(error);
          this.loading = !this.loading;
        }
      );
    
  }
  refresh3(response){
    if(response['status'] == 200 && response['body']['error'] == false){
      this.router.navigate(['/thank-you']); 
    }else if(response['body']['error'] == true){
      this.msg = response['body']['msg'];
      this.openDialog3();
    }
  }
  refresh2(response){
    if(response['status'] == 200){
      let currentYear: number = new Date().getFullYear();
      for(let i = (currentYear); i < (currentYear + 10); i++) {
          this.years.push(i);
      }
      var formData: any = new FormData();
      var user_id = localStorage.getItem('userId');
      formData.append("user_id", user_id);
      
      this.http.post(endpoint +"/api/getCart", formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
        this.items = data["data"]["carts"];
        this.item = data["data"];
        //this.totalAmount
        this.qnt = [];
        this.cart_id = [];
        for (var i = 0; i < this.items.length; i++){
          this.qnt.push(this.items[i].quantity);
          this.cart_id.push(this.items[i].id);
        }
      }, (error = true) => {
        //console.log(error)
        this.error = error
        this.openDialog2();
      });
    }
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.msg = result;
    });
  }

  openDialog2(): void {
    let dialogRef = this.dialog.open(CartEmptyOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: "No products added in cart, Kindly add first." }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.msg = this.error;
    });
  }
  openDialog3(): void {
    let dialogRef = this.dialog.open(PaymentFailedOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
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
@Component({
  selector: 'cart-empty-overview-example-dialog',
  templateUrl: 'cart-empty-overview-example-dialog.html',
})
export class CartEmptyOverviewExampleDialog {

  constructor(private router: Router, 
    public dialogRef: MatDialogRef<CartEmptyOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick2(): void {
    this.dialogRef.close();
    this.router.navigate(['/home']); 
  }
}
@Component({
  selector: 'payment-failed-overview-example-dialog',
  templateUrl: 'payment-failed-overview-example-dialog.html',
})
export class PaymentFailedOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<PaymentFailedOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}