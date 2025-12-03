import { Component, Input } from '@angular/core';
import { IVisita } from '../../types/visitas';
import { CommonModule } from '@angular/common';
import { RegistroTablaActionsComponent } from '../registro-tabla-actions/registro-tabla-actions.component';
import { DatetimePipe } from '../../../../pipe/datetime-pipe';

@Component({
  selector: 'tr[app-registro-tabla]',
  imports: [CommonModule, RegistroTablaActionsComponent, DatetimePipe],
  templateUrl: './registro-tabla-private.component.html',
  styleUrl: './registro-tabla-private.component.css',
  standalone: true
})
export class RegistroTablaComponent {
  @Input() visita!: IVisita;
}
