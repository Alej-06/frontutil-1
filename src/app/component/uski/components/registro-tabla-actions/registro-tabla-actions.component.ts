import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IVisita } from '../../types/visitas';
import { VisitasService } from '../../services/visitas';

@Component({
  selector: 'app-registro-tabla-actions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './registro-tabla-actions.component.html',
  styleUrl: './registro-tabla-actions.component.css'
})
export class RegistroTablaActionsComponent {
  constructor(private oVisitasService: VisitasService) {}

  @Input() visita!: IVisita;

  onTogglePublish() {
    const nuevoEstado = !this.visita.estaPublicado;
    this.oVisitasService.update({ id: this.visita.id, estaPublicado: nuevoEstado }).subscribe({
      next: () => (this.visita.estaPublicado = nuevoEstado),
      error: (err) => console.error('No se pudo actualizar', err),
    });
  }
}
