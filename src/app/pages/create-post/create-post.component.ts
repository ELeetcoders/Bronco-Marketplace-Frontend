import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  selectedCategory = 'option2';
  categories: any[] = [
    'Textbooks',
    'Electronics',
    'Services'
  ];
}
