import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CheckboxModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToastModule
  ]
})
export class PrimengModule { }
