import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiberneticaRoutingModule } from './cibernetica-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    CiberneticaRoutingModule
  ]
})
export class CiberneticaModule { }
