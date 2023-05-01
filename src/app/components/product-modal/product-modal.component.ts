import { Component, HostListener } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductDetailService } from 'src/app/services/ProductDetailService';
import { User } from 'src/app/models/User';
import { MessagesComponent } from 'src/app/pages/messages/messages.component';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})

export class ProductModalComponent {

  imageUrl: string = '';
  title: string = '';
  description: string = '';
  price: string = '';
  email: string = '';
  userSeller: User;

  constructor(
    public modalRef: MdbModalRef<ProductModalComponent>,
    private location: Location,
    public router: Router,
    public ProductDetailService: ProductDetailService,
    public ChatService: ChatsService,
    public messageComponent: MessagesComponent
    ) {}

  ngOnInit() {
    this.imageUrl = this.ProductDetailService.imageUrl;
    this.description = this.ProductDetailService.description;
    this.title = this.ProductDetailService.title;
    this.price = this.ProductDetailService.price;
    this.email = this.ProductDetailService.email
    this.userSeller = this.ProductDetailService.userSeller
  //   const modalState = {
  //     modal : true,
  //     desc : 'Product details'
  // };
  // history.pushState(modalState, '', '/idk');
  }

  @HostListener('window:popstate', ['$event'])
  closeModalOnBack() {
    this.modalRef.close()
  }

  closeModal() {
    this.modalRef.close()
    // make it so that it changes to the base URL using location object
    // console.log(this.title)
    // console.log('eeee')
    //this.modalRef.close();
    //this.location.back();
    //this.location.replaceState('/')
    //this.modalRef.close();
    //this.router.navigate(['/'])
  }

  navigateToMessagesAndCreateChat(otherUser: User) {
    this.closeModal()
    this.router.navigate(['/messages']).then(async () => {
      await this.messageComponent.createChat(otherUser)
      //this.messageComponent.endOfChat.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    this.closeModal();
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }
  
}