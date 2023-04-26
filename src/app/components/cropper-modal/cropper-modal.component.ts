import { Component } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrls: ['./cropper-modal.component.css']
})
export class CropperModalComponent {
  constructor(public modalRef: MdbModalRef<CropperModalComponent>, public userService: UserService) {}

  imageChangedEvent: any = '';
  empty_pfp: String = '../../../assets/images/empty_pfp.png'
  croppedImage: any = this.userService.profilePic == '' ? this.empty_pfp : this.userService.profilePic

    fileChangeEvent(event: any): void {
        console.log("here")
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        //console.log(this.croppedImage)
    }
    imageLoaded(image: LoadedImage) {
        console.log(image)
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    onSelectFile(event: any) {
      // called each time file input changes
          // Check if the file size exceeds 1MB
          const file = event.target.files[0];
          console.log("file selected")
            console.log(file.size)
            this.croppedImage = file
          if (file.size > 100000) {
            console.log("need to compress")
            console.log(file.size)
            new Compressor(file, {
              quality: 0.3, // Set the compression quality to 30%
              success: (compressedFile) => {
                console.log(compressedFile);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile); // read file as data url
                reader.onload = (event) => { // called once readAsDataURL is completed
                  if (event && event.target) {
                    this.croppedImage = compressedFile
                  }
                };
              }
            })}};
}
