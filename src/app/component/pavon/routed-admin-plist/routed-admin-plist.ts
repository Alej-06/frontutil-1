import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { IRecurso } from '../../../model/pavon/recurso';
import { PavonService } from '../../../service/pavon/recurso';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { DatetimePipe } from "../../../pipe/datetime-pipe";
import { BotoneraRellena } from "../botonera-rellena/botonera-rellena";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-routed-admin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, DatetimePipe, BotoneraRellena],
  templateUrl: './routed-admin-plist.html',
  styleUrl: './routed-admin-plist.css',
})
export class RoutedAdminPlistPavon {
  oPage: IPage<IRecurso> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  // alert message from navigation
  alertMessage: string | null = null;
  showAlert: boolean = false;
  // track updating rows to disable toggle button while request in progress
  updatingIds: Set<number> = new Set<number>();
  // sorting
  sortField: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private oPavonService: PavonService, private route: ActivatedRoute) { }

  oBotonera: string[] = [];

  // cantidad options: handled by local botonera-rellena component

  ngOnInit() {
    // read possible message from navigation
    this.route.queryParams.subscribe(params => {
      const msg = params['msg'];
      if (msg) {
        this.alertMessage = msg;
        this.showAlert = true;
        // auto-dismiss after 4s
        setTimeout(() => { this.showAlert = false; }, 4000);
        // refresh list so changes are visible
        this.getPage();
      }
    });
    this.getPage();
  }

  closeAlert() {
    this.showAlert = false;
    this.alertMessage = null;
  }

  getPage() {
    this.oPavonService.getPage(this.numPage, this.numRpp, this.sortField, this.sortDirection).subscribe({
      next: (data: IPage<IRecurso>) => {
        this.oPage = data;
        // si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
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

  onCantidadChange(n: number) {
    this.rellenaCantidad = n;
    return false;
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      // toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.getPage();
    return false;
  }

  generarFake() {
    this.rellenaOk = null;
    this.rellenaError = null;
    this.rellenando = true;
    const calls = [];
    for (let i = 0; i < this.rellenaCantidad; i++) {
      const payload: Partial<IRecurso> = {
        nombre: `Recurso ${Math.random().toString(36).substring(2, 9)}`,
        url: `https://example.com/${Math.random().toString(36).substring(2, 9)}`,
        publico: Math.random() < 0.5,
      };
      calls.push(this.oPavonService.create(payload));
    }

    forkJoin(calls).subscribe({
      next: (results: number[]) => {
        this.rellenando = false;
        this.rellenaOk = results.length;
        this.getPage();
      },
      error: (err) => {
        this.rellenando = false;
        this.rellenaError = 'Error generando datos aleatorios';
        console.error(err);
      }
    });
  }

  togglePublic(oRecurso: IRecurso) {
    if (!oRecurso || !oRecurso.id) return;
    const id = oRecurso.id;
    if (this.updatingIds.has(id)) return;
    this.updatingIds.add(id);

    const payload: Partial<IRecurso> = {
      id: oRecurso.id,
      nombre: oRecurso.nombre,
      url: oRecurso.url,
      publico: !oRecurso.publico,
      fechaCreacion: oRecurso.fechaCreacion,
      fechaModificacion: oRecurso.fechaModificacion,
    };

    this.oPavonService.update(payload).subscribe({
      next: () => {
        // update local model so UI reflects change immediately
        oRecurso.publico = !oRecurso.publico;
        this.updatingIds.delete(id);
        this.alertMessage = 'Visibilidad actualizada';
        this.showAlert = true;
        setTimeout(() => { this.showAlert = false; }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error toggling publico:', err);
        this.updatingIds.delete(id);
        this.alertMessage = 'Error actualizando visibilidad';
        this.showAlert = true;
        setTimeout(() => { this.showAlert = false; }, 4000);
      }
    });
  }
}
