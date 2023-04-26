import { Component } from '@angular/core';
import Compressor from 'compressorjs';
import { CropperModalComponent } from 'src/app/components/cropper-modal/cropper-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  profileImage: any = '';
  imageChangedEvent: any = '';

  modalRef: MdbModalRef<CropperModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(CropperModalComponent, {
      modalClass: 'modal-xl'
    })
  }

}
