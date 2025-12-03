import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botonera-rellena',
  imports: [],
  templateUrl: './botonera-rellena.html',
  styleUrl: './botonera-rellena.css',
})
export class BotoneraRellena {
  @Input() cantidad: number = 10;
  @Input() options: number[] = [10, 20, 50, 100];
  @Output() cantidadChange = new EventEmitter<number>();

  setCantidad(n: number) {
    this.cantidad = n;
    this.cantidadChange.emit(this.cantidad);
    return false;
  }

}
