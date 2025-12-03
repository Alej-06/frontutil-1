import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPage } from '../../../model/plist';
import { IRecurso } from '../../../model/pavon/recurso';
import { PavonService } from '../../../service/pavon/recurso';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { UnroutedUserView2Pavon } from "../unrouted-user-view2/unrouted-user-view2";


@Component({
  selector: 'app-routed-user-plist',
  imports: [Paginacion, UnroutedUserView2Pavon],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class RoutedUserPlistPavon {
  oPage: IPage<IRecurso> | null = null;
  numPage: number = 0;
  numRpp: number = 2;
  private allPublicRecursos: IRecurso[] = [];

  constructor(private oPavonService: PavonService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.loadAllPublicRecursos();
  }

  loadAllPublicRecursos() {
    // Obtener la primera página con muchos elementos para filtrar
    const largePageSize = 100;
    this.oPavonService.getPage(0, largePageSize, 'fechaCreacion', 'desc').subscribe({
      next: (data: IPage<IRecurso>) => {
        // Filtrar solo recursos públicos
        this.allPublicRecursos = data.content.filter(recurso => recurso.publico === true);
        this.updatePageDisplay();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  private updatePageDisplay() {
    // Calcular índices de inicio y fin para esta página
    const startIndex = this.numPage * this.numRpp;
    const endIndex = startIndex + this.numRpp;
    
    // Obtener los recursos para esta página
    const pageContent = this.allPublicRecursos.slice(startIndex, endIndex);
    
    // Crear objeto IPage con los datos filtrados
    this.oPage = {
      content: pageContent,
      totalElements: this.allPublicRecursos.length,
      totalPages: Math.ceil(this.allPublicRecursos.length / this.numRpp) || 1,
      numberOfElements: pageContent.length,
      size: this.numRpp
    } as IPage<IRecurso>;
  }

  getPage() {
    this.updatePageDisplay();
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPage();
    return false;
  }
}
