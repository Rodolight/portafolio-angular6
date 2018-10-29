import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];


  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve,reject) =>{
      this.http.get('https://angular-html-99d65.firebaseio.com/productos_idx.json')
          .subscribe((resp: Producto[]) =>{
          this.productos = resp;
          this.cargando = false;   
          resolve();
          })
    });
  
  }

  getProductos(id:string){
   return this.http.get(`https://angular-html-99d65.firebaseio.com/productos/${id}.json`);
  }


  buscarProducto(termino: string){
    if ( this.productos.length == 0 ){
        // cargar productos
        this.cargarProductos().then(()=>{
          //ejecutar despues d etener los productos
          // Aplicar filtro
          this.filtrarProductos(termino);
        })  
    }else{
      // Aplicar filtro
      this.filtrarProductos(termino);
    }
    
    }

    private filtrarProductos(termino: string){

      this.productosFiltrados = [];
      
      termino: termino.toLocaleLowerCase();

      this.productos.forEach( prod =>{

        const tituloLower = prod.titulo.toLocaleLowerCase();
        
        if ( prod.categoria.indexOf(termino) >=0 || tituloLower.indexOf(termino) >= 0){
          this.productosFiltrados.push(prod);
        }
      })
    }
}