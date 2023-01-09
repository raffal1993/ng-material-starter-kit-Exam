import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CountriesComponent } from './countries.component';

@NgModule({
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterModule, MatChipsModule],
  declarations: [CountriesComponent],
  providers: [],
  exports: [CountriesComponent],
})
export class CountriesComponentModule { }
