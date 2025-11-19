import { Component, inject, Input } from '@angular/core';
import { IBlog } from '../../../model/blog';

@Component({
  selector: 'app-post-view',
  imports: [],
  templateUrl: './post-view.html',
  styleUrl: './post-view.css',
})
export class PostView {
  @Input() oBlog: IBlog | null = null;
  
}
