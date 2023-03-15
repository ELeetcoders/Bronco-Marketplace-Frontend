import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import heic2any from 'heic2any';

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
  imageUrl: string = '';
  categories: any[] = [
    'Textbooks',
    'Electronics',
    'Services'
  ];

  descriptionFormControl = new FormControl();
  characterCount = 0;
  maxLength = 100;
  url = ''

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.descriptionFormControl.valueChanges.subscribe((value) => {
        this.characterCount = value.length;
        this.description = value
    });
  }

  onKeydown(event: KeyboardEvent): void {
    const currentLength = this.descriptionFormControl.value ? this.descriptionFormControl.value.length : 0;
    const isMaxLength = currentLength >= this.maxLength;
  
    if (isMaxLength && event.key !== 'Backspace' && !(event.ctrlKey && event.key === 'a')) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    const clipboardData: any = event.clipboardData;
    const pastedData = clipboardData.getData('text');
    if (pastedData.length > this.maxLength - this.characterCount) {
      const truncatedData = pastedData.slice(0, this.maxLength - this.characterCount);
      const updatedValue = this.descriptionFormControl.value + truncatedData;
      this.descriptionFormControl.setValue(updatedValue);
      event.preventDefault();
    } else {
      const updatedValue = this.descriptionFormControl.value + pastedData;
      this.descriptionFormControl.setValue(updatedValue);
    }
  }

  onSelectFile(event: any) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const extension = file.name.split('.').pop();
      const isHeic = extension.toLowerCase() === 'heic';
      console.log(isHeic)
  
      if (isHeic) {
        heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 1
        })
        .then((jpegBlob: any) => {
          console.log(jpegBlob);
          this.productImage = jpegBlob;
        console.log(jpegBlob)
        const reader = new FileReader();
        reader.readAsDataURL(jpegBlob); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          if (event && event.target) {
            this.url = event.target.result as string;
            console.log(this.url);
          }
        }
        })
        
      } else {
        this.productImage = file;
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          if (event && event.target) {
            this.url = event.target.result as string;
            console.log(this.url);
          }
        }
      }
    }
  }
  
}
