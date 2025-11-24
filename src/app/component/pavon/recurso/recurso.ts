import { Component } from '@angular/core';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { PavonService } from '../../../service/pavon/recurso';
import { IRecurso } from '../../../model/pavon/recurso';
import { IPage } from '../../../model/plist';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recurso',
  imports: [Paginacion],
  templateUrl: './recurso.html',
  styleUrl: './recurso.css',
})
export class RecursoPavon {
  oPage: IPage<IRecurso> | null = null;
  numPage: number =0;
  numRpp: number =0;

  constructor(private oPavonService: PavonService) { }
  
    oBotonera: string[] = [];
  
    ngOnInit() {
      this.getPage();
    }

  getPage() {
    this.oPavonService.getPage(this.numPage, this.numRpp, 'fechaCreacion', 'desc').subscribe({
      next: (data: IPage<IRecurso>) => {
        this.oPage = data;
        // OJO! si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
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
