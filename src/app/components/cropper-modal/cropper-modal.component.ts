import { Component, ViewChild } from '@angular/core';
import { ImageCroppedEvent, LoadedImage, ImageCropperComponent, CropperSettings } from 'ngx-image-cropper';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/services/UserService';
import { Firestore, collectionData, collection, query, where, doc, docData, updateDoc } from '@angular/fire/firestore';
import Compressor from 'compressorjs';
import heic2any from 'heic2any';


@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrls: ['./cropper-modal.component.css']
})
export class CropperModalComponent {

  // @ViewChild('cropper', { static: false }) cropper!: ImageCropperComponent;

  constructor(
    public modalRef: MdbModalRef<CropperModalComponent>,
    public userService: UserService,
    firestore: Firestore
    ) {
      this.firestore = firestore
      this.cropperSettings = new CropperSettings();
    }

  private firestore: Firestore
  cropperSettings: CropperSettings;
  productImage: File;
  imageChangedEvent: any = '';
  empty_pfp: String = '../../../assets/images/empty_pfp.png'
  croppedImage: any = this.userService.profilePic == '' ? this.empty_pfp : this.userService.profilePic

    fileChangeEvent(event: any): void {
        console.log(this.croppedImage)
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        //console.log(this.croppedImage)
    }
    imageLoaded(image: LoadedImage) {
      console.log("urmoma")
      console.log(image)
        // show cropper
    }
    cropperReady() {
      this.croppedImage = this.croppedImage
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    updateProfilePic() {
      const userRef = doc(collection(this.firestore, 'user'), this.userService.email);
      updateDoc(userRef, { profilePic: this.croppedImage })
        .then(() => {
          console.log('Document updated successfully!');
          this.userService.profilePic = this.croppedImage
          this.modalRef.close();
        })
        .catch((error) => console.error('Error updating document:', error));
    }


    onSelectFile(event: any) {
      // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const extension = file.name.split('.').pop();
        const isHeic = extension.toLowerCase() === 'heic';
        const isPng = extension.toLowerCase() === 'png';
        console.log(extension)
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
                  this.croppedImage = event.target.result as string;
                  this.imageChangedEvent = { target: { src: this.croppedImage } };
                  console.log(this.croppedImage);
                }
              };
            });
    
        } else if (isPng) {
          if (file.size > 100000) {
            console.log("greater")
            console.log(file.size)
            new Compressor(file, {
              quality: file.size / 109000, // Set the compression quality to 15%
              success: (compressedFile) => {
                console.log(compressedFile);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile); // read file as data url
                reader.onload = (event) => { // called once readAsDataURL is completed
                  if (event && event.target) {
                    this.croppedImage = event.target.result as string;
                    console.log(this.croppedImage);
                  }
                };
              }
            })}
            else {
              this.productImage = file;
            console.log(file);
            const reader = new FileReader();
            reader.readAsDataURL(file); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
              if (event && event.target) {
                this.croppedImage = event.target.result as string;
                console.log(this.croppedImage);
              }
            };
            }
        } else {
          // Check if the file size exceeds 1MB
          console.log("greater")
            console.log(file.size)
          if (file.size > 100000) {
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
                    this.croppedImage = event.target.result as string;
                    console.log(this.croppedImage);
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
                this.croppedImage = event.target.result as string;
                console.log(this.croppedImage);
              }
            };
          }
        }
      }
    }
}
