import { Component } from '@angular/core';
import { IBlog } from '../../../model/blog';
import { BlogService } from '../../../service/blog';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PostView } from "../post-view/post-view";

@Component({
  selector: 'app-post-routed-view',
  imports: [PostView],
  templateUrl: './post-routed-view.html',
  styleUrls: ['./post-routed-view.css'],
})
export class PostRoutedView {
  oBlog: IBlog | null = null;

  constructor(private oBlogService: BlogService, private route: ActivatedRoute) {
    // Obtener el ID del blog desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const blogId = idParam ? Number(idParam) : NaN;
    if (isNaN(blogId)) {
      console.error('Invalid blog id:', idParam);
      return;
    }
    this.getBlog(blogId);
  }

  ngOnInit() { }

  getBlog(blogId: number) {
    this.oBlogService.get(blogId).subscribe({
      next: (data: IBlog) => {
        this.oBlog = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching blog:', error);
      },
    });
  }
}
