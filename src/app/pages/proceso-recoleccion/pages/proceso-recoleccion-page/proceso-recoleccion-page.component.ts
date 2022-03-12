import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableBasicComponent } from 'src/app/components/table/table-basic/table-basic.component';

@Component({
  selector: 'app-proceso-recoleccion-page',
  templateUrl: './proceso-recoleccion-page.component.html',
  styleUrls: ['./proceso-recoleccion-page.component.scss']
})
export class ProcesoRecoleccionPageComponent implements  AfterViewInit,OnInit {
  @ViewChild(TableBasicComponent) TablaBasicaComponent: TableBasicComponent;

  constructor(public Router:Router) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.TablaBasicaComponent.initDataTable("usuario","getAll",{usuarioNOMBRE:'Usuario',usuarioFCHCREO:'Fecha',usuarioTIPO:'Tipo', usuarioESTADO:'Estado'},'usuarioID');
  }

  editar(){
    let elemen=this.TablaBasicaComponent.getSelect();
    if(elemen){
      this.Router.navigateByUrl('documentos/editar/'+elemen);
    }
  }

  nuevo(){
    this.Router.navigateByUrl('documentos/nuevo');
  }

  ver(){
    let elemen=this.TablaBasicaComponent.getAllSelect();
    if(elemen){
      this.Router.navigateByUrl('documentos/ver/'+elemen);
    }
  }
}
