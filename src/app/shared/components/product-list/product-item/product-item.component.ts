import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../shared/services';
import { BackendService } from '../../../../shared/services';
import { NotifyService } from 'ngx-notify';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  @Output() showimageform = new EventEmitter();
  @Output() productIdEvent = new EventEmitter();

  productImage;

  constructor(
    private auth: AuthService,
    private backend: BackendService,
    private notify: NotifyService,
  ) {}

  ngOnInit() {
    this.getProductImages();
  }

  get id() {
    return this.product._id || this.product.id;
  }

  get productIdFromProductUrl() {
    const productUrl = this.product.url;
    const productId = productUrl.match(/.*\/(.*)\//)[1];
    return productId;
  }

  get info() {
    return this.product;
  }

  get name() {
    return this.product.name;
  }

  get description() {
    return this.product.description;
  }

  get shortDescription() {
    const len = this.product.description.length;
    return this.product.description.substr(1, 120 || len);
  }

  get categories() {
    return this.product.categories;
  }

  get picture() {
    return this.product.picture;
  }

  get price() {
    return this.product.price;
  }

  get tags() {
    return this.formatString(this.product.product_tag);
  }

  formatString(string) {
    return string.toString().replace(/\s/g, '')
      .split(',').join(', ').replace(/P-/g,'');
  }

  get discountPorcentage() {
    const regularPrice = parseInt(this.product.regular_price, 0);
    const salePrice = parseInt(this.product.sale_price, 0);

    return Math.round((regularPrice - salePrice) / regularPrice * 100 || 0);
  }

  get checkIsAdmin() {
    return this.auth.checkIsAdmin();
  }

  getProductImages() {
    const fromUrl = this.productIdFromProductUrl;

    this.backend.getProductsImage().subscribe((imagaData: any) => {

      const productImages = imagaData.filter(imagaData =>
        imagaData.product.url.match(/.*\/(.*)\//)[1] === fromUrl
      );

      const productImage = productImages.map(obj => {
        return obj.image;
      });

      this.productImage = productImage !== undefined ? productImage[0] : ``;

    });

  }


  showAddImageForm(productId) {
    this.productIdEvent.emit(productId);
    this.showimageform.emit();
  }

  removeProduct(id) {
    return this.backend.removeProduct(id);
  }

}
