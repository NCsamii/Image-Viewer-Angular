import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'imageViewer';
  images:string[]=['https://freeimage.host/i/Jap65G4' , 'https://freeimage.host/i/Jap6Gwu', 'https://freeimage.host/i/Jap6O8P']
}
