import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  public EMPRESA_DESARROLLADORA_NOMBRE = environment.EMPRESA_DESARROLLADORA_NOMBRE;

  constructor() { }

  ngOnInit() {
  }

}
