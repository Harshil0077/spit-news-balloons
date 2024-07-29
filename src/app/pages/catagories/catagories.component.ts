import { Component } from '@angular/core';

@Component({
  selector: 'ngx-categories',
  styleUrls: ['categories.component.scss'],
  template: `
  <div class="container">
    <div class="card">
      <div class="card-body">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
`,
})
export class CatagoriesComponent {

   
}
