import { Component } from '@angular/core';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
  template: `
  <div class="container">
    <div class="card">
      <div class="card-body">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>`,
})
export class SubcategoriesComponent  {}
