import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  title: string = 'Test';
  description: string = "Some quick example text to build on the card title and make up the bulk of the card's content.";
  selectedCategory: string = '';
  productImage: File;
  imageUrl: SafeUrl;
  categories: any[] = [
    'Textbooks',
    'Electronics',
    'Services'
  ];

  descriptionFormControl = new FormControl();
  characterCount = 0;
  maxLength = 100;

  constructor(private sanitizer: DomSanitizer) {}

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

  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
    console.log(this.productImage)
  }

  getImageUrl() {
    if (!this.productImage) {
      return '';
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.productImage);
  
    return this.imageUrl;
  }
  
}
