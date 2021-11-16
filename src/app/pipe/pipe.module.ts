import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrosPipe } from './filtros.pipe';



@NgModule({
  declarations: [FiltrosPipe],
  exports:[FiltrosPipe]
 
})
export class PipeModule { }
