import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/servicios/base.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import { environment } from 'src/environments/environment';
declare var $;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild('dataTable') table: ElementRef;

  dataTable: any; /* 📝REFERENVIA DE LA CREACION DE LA TABLA  */

  public componentAPI;  /* OPERACION DONDE SE VA A EXTRAER LOS DATOS DE LA TABLA */
  public operationAPI;

  public data;   /* 📝DATOS PARA LA TABLA  */
  public columnas; /* 📝COLUMNAS PARA LA TABLA  */
  public keys; /* 📝KEYS DE LOS DATOS A MOSTRAR  */
  public idKey; /* 📝KEYS IDENTIFICADORA DE LA TABLA */
  public quantityTotalItems; /* CANTIDAD TOTAL DE ELEMENTOS O ITEMS */
  public initialamountShow; /* CANTIDAD INICIAL A MOSTRAR */
  public temaTableDark;

  allSelected=[];


  dtOption = {
    "sDom": 'T<"clear">lfrtip',
    "language": {
        "search": "Buscar:",
        "zeroRecords": "No se encontraron datos",
        "infoEmpty": "No hay datos para mostrar",
        "info": "Mostrando del _START_ al _END_, de un total de _TOTAL_ entradas",
        "paginate": {
            "first": "Primeros",
            "last": "Ultimos",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
    "paging":   true,
    "ordering": false,
    "lengthMenu":[25,50,100],
    "destroy":true,
    "processing":true,
    "serverSide":true,
    "autoWidth": true,
    "scrollY": 600,
    "scrollX": true,
    "dom": 'Bfrtip',
    "select": "multi",
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      const self = this;
      $('td', row).off('click');
      $('td', row).on('click', () => {
        self.selectElemto(data);
      });
      return row;
    }
  };


  constructor(
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    public BaseService:BaseService,
    public SweetalertService:SweetalertService,
    public spinner:NgxSpinnerService
    ) {

  }

  ngOnInit(): void {
    this.spinner.show("datatable");
  }

  initDataTable(componentAPI, operationAPI, colum, idKey, dtOption=null){

    this.idKey = idKey;
    this.componentAPI = componentAPI;
    this.operationAPI = operationAPI;
    this.keys = Object.keys(colum);
    this.columnas = Object.values(colum);
    this.dtOption = (dtOption == null) ? this.dtOption : Object.assign(this.dtOption, dtOption);
    this.initialamountShow = (this.dtOption.hasOwnProperty('lengthMenu'))?this.dtOption.lengthMenu[0]:25;

    this.BaseService.postJson(
      componentAPI,
      operationAPI,
      {cantidad:this.initialamountShow}
    ).subscribe(res => {
      if (res.RESPUESTA == "EXITO") {
        this.data = res.DATOS;
        this.quantityTotalItems = 3/* res.DATOS.CantidadTotal.cantidadTotal */;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }

      setTimeout(() => {
        this.generateDataTable();
        this.spinner.hide("datatable");
      }, 1000);
    }, error =>{
      this.SweetalertService.modal("error", environment.MENSAJES.ERROR);
      console.error(error);
    });

    /* this.cdref.detectChanges(); */
  }

  generateDataTable(){
    this.dtOption.lengthMenu.push(this.quantityTotalItems);
    this.addingAjaxToOptionDataTable();
    this.armandoBotones();
    this.dataTable = $(this.table.nativeElement).DataTable(this.dtOption);
  }

  addingAjaxToOptionDataTable(){
    const that = this;
    this.dtOption["ajax"] = function (data,callback,setting){

      if(data.search.value.length==0||data.search.value.length>3){
        that.spinner.show("datatable");
        that.BaseService.postJson(
          that.componentAPI,
          that.operationAPI,
          {
            inicioBusqueda:data.start,
            cantidad:data.length,
            busqueda:data.search.value
          }
        ).subscribe(res => {

          if (res.RESPUESTA == "EXITO") {
            let data = that.buildingDataStructure(res.DATOS);
            callback(data);
          }else{
            that.SweetalertService.modal("error",res.MENSAJE);
          }
          that.spinner.hide("datatable");
        }, error =>{
          that.SweetalertService.modal("error", environment.MENSAJES.ERROR);
          console.error(error);
          that.spinner.hide("datatable");
        });
      }
    }
    this.dtOption["deferLoading"]=this.quantityTotalItems;
  }

  armandoBotones(){
    const that=this;
    this.dtOption["buttons"]=[
      {
        extend: 'colvis',
        text: 'Columnas'
    },
      {
        extend: 'pdf',
        text: 'PDF'
    },
    {
        extend: 'excel',
        text: 'EXCEL'
    }
      /* {
        text: 'Select all',
        action: function () {
          that.dataTable.row().select();
        }
    },
    {
        text: 'Select none',
        action: function () {
          that.dataTable.row().deselect();
        }
    } */
    ];
  }

  buildingDataStructure(data){

    let arrayTotal = [];
    data.forEach(element => {

      let arrayElemnt = [];

      arrayElemnt.push(element[this.idKey]);

      this.keys.forEach(keyColumn => {
        arrayElemnt.push(element[keyColumn]);
      });

      arrayTotal.push(arrayElemnt);
    });

    return {
      data:arrayTotal,
      recordsTotal: data.length,
      recordsFiltered: this.quantityTotalItems
    };
  }

  selectElemto(info: any){

    if(info[0]){
      let indexElem=this.allSelected.indexOf(info[0]);
      if(indexElem!=-1){
        this.allSelected.splice(indexElem,1);
      }else{
        this.allSelected.push(info[0]);
      }
    }

  }

  getAllSelect(){
    if(this.allSelected.length>0){
      return this.allSelected;
    }else{
      this.SweetalertService.modal("info","Por favor seleccione por lo menos un elemento.");
      return false;
    }
  }

  getSelect(){
    if(this.allSelected.length>0){
      if(this.allSelected.length==1){
        return this.allSelected[0];
      }else{
        this.SweetalertService.modal("info","Por favor seleccione un solo elemento.");
      }
    }else{
      this.SweetalertService.modal("info","Por favor seleccione un elemento.");
    }
    return false;
  }


}
