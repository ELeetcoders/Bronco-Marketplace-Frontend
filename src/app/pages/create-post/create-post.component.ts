import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import heic2any from 'heic2any';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import Compressor from 'compressorjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  title: string = '';
  description: string = ''; //"Some quick example text to build on the card title and make up the bulk of the card's content.";
  selectedCategory: string = '';
  productImage: File;
  imageUrl: string = '';
  price: string = '';
  categories: any[] = [
    'Textbooks',
    'Tech',
    'Services'
  ];

  descriptionFormControl = new FormControl();
  characterCount = 0;
  maxLength = 100;
  //url = ''

  constructor(private http: HttpClient, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.descriptionFormControl.valueChanges.subscribe((value) => {
        this.characterCount = value.length;
        this.description = value
    });
  }

  onKeydown(event: KeyboardEvent): void {
    const currentLength = this.descriptionFormControl.value ? this.descriptionFormControl.value.length : 0;
    const isMaxLength = currentLength >= this.maxLength;
    const isControlShortcutKey = (event.ctrlKey || event.metaKey) && ["a", "c", "x", "z", "y"].includes(event.key.toLowerCase());
    const isPrintableKey = event.key.length === 1;
    const isAllowedSpecialChar = /[-_+|\\{}[\]()`;:',.<>?]/.test(event.key);
    if (event.key == 'Tab') {}
    else if (isMaxLength && !isControlShortcutKey && event.key !== "Backspace") {
      event.preventDefault();
    } else if (!isControlShortcutKey && (isPrintableKey || !isAllowedSpecialChar) && event.key !== "Backspace" && currentLength >= this.maxLength) {
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
      if (this.descriptionFormControl.value == null) {
        this.descriptionFormControl.setValue("")
      }
      const updatedValue = this.descriptionFormControl.value;
      this.descriptionFormControl.setValue(updatedValue);
    }
  }

  onSelectFile(event: any) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const extension = file.name.split('.').pop();
      const isHeic = extension.toLowerCase() === 'heic';
      console.log(isHeic);
  
      if (isHeic) {
        heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: .3
        })
          .then((jpegBlob: any) => {
            console.log(jpegBlob);
            this.productImage = jpegBlob;
            console.log(jpegBlob);
            const reader = new FileReader();
            reader.readAsDataURL(jpegBlob); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
              if (event && event.target) {
                this.imageUrl = event.target.result as string;
                console.log(this.imageUrl);
              }
            };
          });
  
      } else {
        // Check if the file size exceeds 1MB
        console.log("greater")
          console.log(file.size)
        if (file.size > 1000000) {
          console.log("greater")
          console.log(file.size)
          new Compressor(file, {
            quality: 0.3, // Set the compression quality to 30%
            success: (compressedFile) => {
              console.log(compressedFile);
              const reader = new FileReader();
              reader.readAsDataURL(compressedFile); // read file as data url
              reader.onload = (event) => { // called once readAsDataURL is completed
                if (event && event.target) {
                  this.imageUrl = event.target.result as string;
                  console.log(this.imageUrl);
                  this.cd.detectChanges()
                }
              };
            }
          });
        } else {
          this.productImage = file;
          console.log(file);
          const reader = new FileReader();
          reader.readAsDataURL(file); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            if (event && event.target) {
              this.imageUrl = event.target.result as string;
              console.log(this.imageUrl);
            }
          };
        }
      }
    }
  }

  onPublishClick(): void {
    // Define the data to be sent in the request body
    console.log(this.title)
    console.log(this.description)
    console.log(this.selectedCategory)
    console.log(Number(this.price).toFixed(2))
    console.log(this.imageUrl)
    if (this.selectedCategory == "Textbooks") {
      this.selectedCategory = "BOOK"
    }
    else if (this.selectedCategory == "Services") {
      this.selectedCategory = "SERVICES"
    }
    const data = {
      name: this.title,
      user: {
        email: "mmt@cpp.edu",
        username: "michael8pho",
        password: "123",
        firstname: "Michael",
        lastname: "Truong"
      },
      desc: this.description,
      category: this.selectedCategory.toUpperCase(),
      price: this.price, // You will need to update this to get the actual price value from the input field
      imageURL: this.imageUrl //.replace("data:image/jpeg;base64,", "")
    };
  
    // Send the HTTP POST request to the server
    const observer: Observer<any> = {
      next: response => console.log(response),
      error: error => console.error(error),
      complete: () => console.log('complete')
    };

    this.http.post('http://localhost:8080/user/create-listing', data).subscribe(observer);
  }
  
}
