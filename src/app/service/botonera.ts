import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BotoneraService {

    getBotonera(numPag: number, numPages: number) : string[] {
        // el usuario siempre espera que las páginas sean 1-based (la primera un uno)
        // sin embargo, el backend trabaja con páginas 0-based (la primera es la 0)
        let botonera: string[] = [];

        // Calcular el rango de páginas a mostrar
        const startPage = Math.max(1, numPag - 2);
        const endPage = Math.min(numPages, numPag + 2);

        // Generar los números de página tenienen cuenta:
        // una vecindad de 2 páginas antes y 2 páginas después de la página actual
        for (let i = startPage; i <= endPage; i++) {
            botonera.push(i.toString());
        }

        return botonera;
    }

}


