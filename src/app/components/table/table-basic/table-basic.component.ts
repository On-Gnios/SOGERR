import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/servicios/base.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent implements OnInit {
  public data;   /* 📝DATOS PARA LA TABLA  */
  public columnas; /* 📝COLUMNAS PARA LA TABLA  */
  public keys; /* 📝KEYS DE LOS DATOS A MOSTRAR  */
  public idKey; /* 📝KEYS IDENTIFICADORA DE LA TABLA */
  public allCheck; /* MAECAR TODOS LOS ITEM */
  public temaTableDark;
  formCheckbox: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    public BaseService: BaseService,
    public SweetalertService: SweetalertService,
    private spinner: NgxSpinnerService
  ) {
    this.formCheckbox = this.formBuilder.group({
      checkboxElemen: this.formBuilder.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.spinner.show("table");
  }


  initDataTable(componente,operacion,columns,idKey, temaTableDark = false){
    this.temaTableDark = temaTableDark;
    this.idKey=idKey;
    this.keys=Object.keys(columns);
    this.columnas=Object.values(columns);
    this.BaseService.postJson(componente,operacion,{}).subscribe(res=>{
      if (res.RESPUESTA=="EXITO") {
        this.data=res.DATOS;
      }else{
         this.SweetalertService.modal("error",res.MENSAJE);
      }
      this.spinner.hide("table");
    }, error =>{
      this.SweetalertService.modal("error", environment.MENSAJES.ERROR);
      this.spinner.hide("table");
    });

    /* this.cdref.detectChanges(); */
  }

  selectAllItem(e){
    const checkboxElemen: FormArray = this.formCheckbox.get('checkboxElemen') as FormArray;
    checkboxElemen.clear();
    if (e.target.checked) {
      this.data.forEach((item,index) => {
        checkboxElemen.push(new FormControl(item[this.idKey]));
        console.log(checkboxElemen.at(index));

      });
      this.allCheck = true;
    }else{
      this.allCheck = false;
    }
    console.log(this.formCheckbox.value);
  }

  selectItem(e){
    const checkboxElemen: FormArray = this.formCheckbox.get('checkboxElemen') as FormArray;
    if (e.target.checked) {
      checkboxElemen.push(new FormControl(e.target.value));
    } else {
       const index = checkboxElemen.controls.findIndex(x => x.value === e.target.value);
       checkboxElemen.removeAt(index);
    }
    console.log(this.formCheckbox.value);
  }

  getAllSelect(){
    if(this.formCheckbox.value.checkboxElemen.length>0){
      return this.formCheckbox.value.checkboxElemen;
    }else{
      this.SweetalertService.modal("info","Por favor seleccione por lo menos un elemento.");
      return false;
    }
  }

  getSelect(){
    if(this.formCheckbox.value.checkboxElemen.length>0){
      if(this.formCheckbox.value.checkboxElemen.length==1){
        return this.formCheckbox.value.checkboxElemen[0];
      }else{
        this.SweetalertService.modal("info","Por favor seleccione un solo elemento.");
      }
    }else{
      this.SweetalertService.modal("info","Por favor seleccione un elemento.");
    }
    return false;
  }

}
