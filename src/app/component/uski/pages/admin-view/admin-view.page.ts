import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VisitasService } from '../../services/visitas';
import { IVisita } from '../../types/visitas';

@Component({
  selector: 'app-admin-view-page',
  imports: [CommonModule],
  templateUrl: './admin-view.page.html',
  styleUrl: './admin-view.page.css',
})
export class UskiAdminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private visitasService = inject(VisitasService);

  oVisita: IVisita | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id)) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    this.load(id);
  }

  load(id: number) {
    this.visitasService.get(id).subscribe({
      next: (data: IVisita) => {
        this.oVisita = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Error cargando el registro';
        this.loading = false;
        console.error(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/visitas/dashboard']);
  }
}
