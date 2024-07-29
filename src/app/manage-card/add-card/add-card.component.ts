import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  years : number[] = [];
  quantity = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {

    let currentYear: number = new Date().getFullYear();
    for(let i = (currentYear); i < (currentYear + 10); i++) {
        this.years.push(i);
    }
    //console.log(this.years);

  }

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
}
