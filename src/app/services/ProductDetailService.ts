import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

    public imageUrl: string = '';
    public title: string = '';
    public description: string = '';
    public price: string = '';
    public email: string = '';
    public userSeller: User;
    public chatId: string = '';
}
