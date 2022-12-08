import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {ProductsComponentModule} from './components/products/products.component-module';
import {CategoryServiceModule} from './services/category.service-module';
import {ProductServiceModule} from "./services/product.service-module";

@NgModule({
  imports: [RouterModule.forRoot([{
    path: 'advanced-list',
    component: ProductsComponent
  }]), ProductsComponentModule, CategoryServiceModule, ProductServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

