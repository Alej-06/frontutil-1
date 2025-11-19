import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { PlistBlog } from './component/blog/plist/plist';
import { RoutedView } from './component/blog/routed-view/routed-view';
import { FrontPlist } from './component/blog/front-plist/front-plist';
import { PostRoutedView } from './component/blog/post-routed-view/post-routed-view';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog/plist', component: PlistBlog },
  { path: 'blog', component: FrontPlist },
  { path: 'blog/view/:id', component: RoutedView },
  { path: 'blog/post/:id', component: PostRoutedView },
];
