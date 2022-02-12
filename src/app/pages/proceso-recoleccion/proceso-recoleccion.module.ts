import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesoRecoleccionPageComponent } from './pages/proceso-recoleccion-page/proceso-recoleccion-page.component';
import { ProcesoRecoleccionRoutingModule } from './proceso-recoleccion-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ProcesoRecoleccionPageComponent
  ],
  imports: [
    CommonModule,
    ProcesoRecoleccionRoutingModule,
    ComponentsModule
  ]
})
export class ProcesoRecoleccionModule { }