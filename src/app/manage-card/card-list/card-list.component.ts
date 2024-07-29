import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cards = [
    {
      CardNumber : '5459 64xx xxxx 5212',
      ExpiryDate  : 'xx/xx'
    },
    {
      CardNumber : '5459 64xx xxxx 5212',
      ExpiryDate  : 'xx/xx'
    },
    {
      CardNumber : '5459 64xx xxxx 5212',
      ExpiryDate  : 'xx/xx'
    },
    {
      CardNumber : '5459 64xx xxxx 5212',
      ExpiryDate  : 'xx/xx'
    },
    {
      CardNumber : '5459 64xx xxxx 5212',
      ExpiryDate  : 'xx/xx'
    },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
