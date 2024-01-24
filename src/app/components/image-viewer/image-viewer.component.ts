import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit{
  @ViewChild('imageContainer') imageContainer !: ElementRef;
  @Output() imageIndex = new EventEmitter<any>()

  @Input() set images(image:string[]) {
    this.imageList = image
  }

  // TRANSFORM POINTS
  scale = 1
  rotate = 0
  rotateLeft = 360
  pointX = 0
  pointY = 0
  start = {x: 0, y: 0}
  panning = false

  currentIndex = 0;
  imageList: string[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

}
