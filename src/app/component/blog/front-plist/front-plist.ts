import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPage } from '../../../model/plist';
import { IBlog } from '../../../model/blog';
import { BlogService } from '../../../service/blog';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { FrontViewPost } from "../front-view/front-view";


@Component({
  selector: 'app-front-plist',
  imports: [Paginacion, FrontViewPost],
  templateUrl: './front-plist.html',
  styleUrl: './front-plist.css',
})
export class FrontPlist {
  oPage: IPage<IBlog> | null = null;
  numPage: number = 0;
  numRpp: number = 2;  

  constructor(private oBlogService: BlogService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oBlogService.getPage(this.numPage, this.numRpp, 'fechaModificacion', 'desc').subscribe({
      next: (data: IPage<IBlog>) => {
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
