import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

    public imageUrl: string = '';
    public title: string = '';
    public description: string = '';
    public price: string = '';
    public email: string = '';
}
