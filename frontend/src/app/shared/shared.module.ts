import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';

@NgModule({
  declarations: [
    ModalMessageComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    CommonModule,
    ModalMessageComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}