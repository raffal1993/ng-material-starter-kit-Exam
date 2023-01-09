import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { CountriesComponentModule } from './components/countries/countries.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([{ path: 'exam-pagination-countries', component: CountriesComponent }]),
    CountriesComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
