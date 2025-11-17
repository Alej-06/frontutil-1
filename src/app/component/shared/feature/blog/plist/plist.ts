import { Component } from '@angular/core';
import { BlogService } from '../../../../../service/blog';
import { IPage } from '../../../../../model/plist';
import { Blog } from '../../../../../model/blog';
import { BotoneraService } from '../../../../../service/botonera';

@Component({
  selector: 'app-plist',
  imports: [],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PlistBlog {

  oPage: IPage<Blog> | null = null;

  constructor(private blogService: BlogService, private oBotoneraService: BotoneraService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.blogService.getPage(6, 3).subscribe({
      next: (data: IPage<Blog>) => {
        this.oPage = data;
        // queremos que se calcule la botonera
        this.oBotonera = this.oBotoneraService.getBotonera(this.oPage.number, this.oPage.totalPages);

      },
      error: (error) => {
        console.error(error);
      }
    });
  }



}
