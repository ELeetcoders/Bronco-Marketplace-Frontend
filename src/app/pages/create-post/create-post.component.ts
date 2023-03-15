import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  title: string = 'Test';
  description: string = '';
  selectedCategory: string = '';
  categories: any[] = [
    'Textbooks',
    'Electronics',
    'Services'
  ];

  descriptionFormControl = new FormControl();
  characterCount = 0;
  maxLength = 100;

  constructor() {}

  ngOnInit(): void {
    this.descriptionFormControl.valueChanges.subscribe((value) => {
        this.characterCount = value.length;
        this.description = value
    });
  }

  onKeydown(event: KeyboardEvent): void {
    const currentLength = this.descriptionFormControl.value != null ? this.descriptionFormControl.value.length : 0;
    const isMaxLength = currentLength >= this.maxLength;

    if (isMaxLength && event.keyCode !== 8) {
      event.preventDefault();
    }
  }
}
