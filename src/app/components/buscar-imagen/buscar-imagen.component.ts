import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {
  nombreImagen: string;
  constructor(private imagenService: ImagenService) { 
    this.nombreImagen='';
  }

  ngOnInit(): void {
  }
  buscarImagenes(){
    if (this.nombreImagen==='') {
        this.imagenService.setError('Agrega un texto de Busqueda');
        return
    }
    this.imagenService.enviarTerminoBusqueda(this.nombreImagen)
  }
}
