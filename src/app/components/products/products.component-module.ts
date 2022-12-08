import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout/flex';
import {ProductsComponent} from './products.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule, FlexModule, MatButtonModule],
  declarations: [ProductsComponent],
  providers: [],
  exports: [ProductsComponent]
})
export class ProductsComponentModule {
}
