import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';

import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { PipesModule } from '../../pipes';
import { UtilsModule } from '../utils';
import { DirectivesModule } from '../../directives';
import { PrimeNGModule } from '../../primeng.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductAddImageFormComponent } from './product-item/product-add-image-form/product-add-image-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGModule,
    RouterModule,
    PipesModule,
    UtilsModule,
    DirectivesModule,
    NgxMasonryModule
  ],
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductFormComponent,
    ProductAddImageFormComponent
  ],
  exports: [
    ProductListComponent,
    ProductItemComponent,
    ProductFormComponent
  ],
  providers: []
})
export class ProductListModule { }
