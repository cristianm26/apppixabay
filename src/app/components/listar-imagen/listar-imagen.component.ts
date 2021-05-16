import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  subscription: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagensPorPagina = 30;
  paginaActual = 1;
  calcularTotalPaginas = 0;
  constructor(private imagenService: ImagenService) {
    this.subscription = this.imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.loading = true;
      this.paginaActual=1;
      this.obtenerImagenes()
    })
  }

  ngOnInit(): void {

  }
  obtenerImagenes() {
    this.imagenService.getImagenes(this.termino, this.imagensPorPagina, this.paginaActual).subscribe(data => {
      this.loading = false;
     
      if (data.hits.length === 0) {
        this.imagenService.setError('No encontramos ningun Resultado')
        return
      }
      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagensPorPagina)
      this.listImagenes = data.hits;
    }, error => {
      this.imagenService.setError('Ocurrio Un Error');
      this.loading = false;
    })
  }
  paginaAnterior() {
    this.paginaActual--;
    this.loading=true;
    this.listImagenes=[];
    this.obtenerImagenes();
  }
  paginaSiguiente() {
    this.paginaActual++;
    this.loading=true;
    this.listImagenes=[];
    this.obtenerImagenes();
  }
  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false
    } else {
      return true
    }
  }
  paginaSiguienteClass() {
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else {
      return true
    }

  }
}
