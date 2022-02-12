import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesoRecoleccionPageComponent } from './pages/proceso-recoleccion-page/proceso-recoleccion-page.component';

const routes: Routes = [{ path: '', component: ProcesoRecoleccionPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoRecoleccionRoutingModule { }
