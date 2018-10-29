import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../Interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
   
  producto: ProductoDescripcion;
  id: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService ) { }

  ngOnInit() {

    /* Llamar instruccion leer parametro de la url*/ 
    this.route.params.subscribe( parametros =>{

      this.productoService.getProductos(parametros["id"])
       .subscribe( (producto: ProductoDescripcion) =>{
         this.producto = producto;
         this.id = parametros["id"];
       });

    });
  }

}
