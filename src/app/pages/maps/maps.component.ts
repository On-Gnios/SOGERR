import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent } from 'src/app/components/table/data-table/data-table.component';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements  AfterViewInit, OnInit {

  @ViewChild(DataTableComponent) DataTableComponent: DataTableComponent;

  constructor(public Router:Router) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.DataTableComponent.initDataTable("usuario","getAll",{usuarioNOMBRE:'Usuario',usuarioFCHCREO:'Fecha',usuarioTIPO:'Tipo', usuarioESTADO:'Estado'},'usuarioID');
  }

  editar(){
    let elemen = this.DataTableComponent.getSelect();
    if(elemen){
      this.Router.navigateByUrl('documentos/editar/'+elemen);
    }
  }

  nuevo(){
    this.Router.navigateByUrl('documentos/nuevo');
  }

  ver(){
    let elemen=this.DataTableComponent.getAllSelect();
    if(elemen){
      this.Router.navigateByUrl('documentos/ver/'+elemen);
    }
  }
}
