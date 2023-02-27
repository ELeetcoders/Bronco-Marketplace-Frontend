import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Bronco Marketplace';

  constructor() {} //runs when component intialized

  ngOnInit(): void { //run whens component loads

  }

}
