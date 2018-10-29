import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // para recibir el parametro de la url
  constructor(private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit() {
    // para recibir el parametro de la url
    this.route.params
    .subscribe(params => {
   
      this.productoService.buscarProducto(params['termino']);
    });
  }

}
