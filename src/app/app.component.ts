import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'imageViewer';
  images: string[] = ['assets/img/image-1.jpg', 'assets/img/image-2.jpg', 'assets/img/image-3.jpg', 'assets/img/image-4.jpg']
}

